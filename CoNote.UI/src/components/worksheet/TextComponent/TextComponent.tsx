import React, { useEffect, useRef, useLayoutEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
//redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, store } from "../../../app/store";
import {
  componentSelectors,
  deleteComponent,
  updateComponent,
  updateComponentInStore,
} from "../../../features/component/slices/componentSlice";
//moveable
import Moveable from "react-moveable";
//tiptap
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import { FontSize, FontSizes } from "../../../extensions/tiptap/FontSize";
import {
  FontFamily,
  FontFamilies,
} from "../../../extensions/tiptap/FontFamily";
//utils
import { getTransform } from "../../../utils/getTransform";
import { signalRManager } from "../../../utils/SignalR/signalRManager";
import { HUB_NAMES } from "../../../utils/SignalR/hubConstants";
import { throttle } from "lodash";
//models
import { ComponentView } from "../../../models/views/ComponentView";
import { ComponentDeletedRequest } from "../../../models/hubs/worksheetHub/ComponentDeletedRequest";
import { UpdateComponentRequest } from "../../../api/Component/models/UpdateComponentRequest";
import { ComponentUpdatedRequest } from "../../../models/hubs/worksheetHub/ComponentUpdatedRequest";
//icons
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatStrikethroughIcon from "@mui/icons-material/FormatStrikethrough";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import DeleteIcon from "@mui/icons-material/Delete";
//components
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  rgbToHex,
  Select,
  TextField,
} from "@mui/material";
import IconButton from "../../ui/IconButton";
import ColorPicker from "../../ui/ColorPicker";
import TextEditorContainer from "../TextEditorContainer";

const throttledSendLiveUpdate = throttle(
  (
    updatedProperties: ComponentView,
    worksheetId: string,
    hubConnection: any
  ) => {
    const request: ComponentUpdatedRequest = {
      worksheetId: Number(worksheetId),
      component: updatedProperties,
    };
    hubConnection.invoke("ComponentUpdated", request);
  },
  350,
  { leading: false, trailing: true }
);

const throttledHandleChange = throttle(
  (
    dispatch: AppDispatch,
    componentId: number,
    component: ComponentView,
    updates: Partial<ComponentView>,
    sendLiveUpdate: (updatedProperties: ComponentView) => void
  ) => {
    dispatch(updateComponentInStore({ id: componentId, changes: updates }));
    const updatedComponent = { ...component, ...updates };
    sendLiveUpdate(updatedComponent);
  },
  100,
  { leading: false, trailing: true }
);

type TextComponentPropsType = {
  id: number;
  selectedId: number | null;
  setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
  boundsRef: React.RefObject<HTMLElement | null>;
  initialProperties: ComponentView;
};

export default function TextComponent({
  id,
  selectedId,
  setSelectedId,
  boundsRef,
  initialProperties,
}: TextComponentPropsType) {
  const { id: worksheetId } = useParams();
  const targetRef = useRef<HTMLDivElement>(null);
  const moveableRef = useRef<Moveable>(null);
  const dispatch = useDispatch<AppDispatch>();

  const componentId = initialProperties.id;
  const component = useSelector((state: RootState) =>
    componentSelectors.selectById(state, componentId)
  );

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      FontSize,
      FontFamily,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      BulletList,
      OrderedList,
    ],
    content: component.content,
    editable: true,
    editorProps: {
      attributes: {
        style: `
          width: 100%;
          height: 100%;
          white-space: pre-wrap;
          overflow-wrap: break-word;
          outline: none;
        `,
      },
    },
  });

  useEffect(() => {
    if (editor && component?.content !== editor.getHTML()) {
      editor.commands.setContent(component.content!);
    }
  }, [component?.content, editor]);

  useEffect(() => {
    if (!editor) return;

    const handleEditorUpdate = () => {
      const newContent = editor.getHTML();
      if (newContent !== component.content) {
        throttledHandleChange(
          dispatch,
          componentId,
          component,
          { content: newContent },
          sendLiveUpdate
        );
      }
    };

    editor.on("update", handleEditorUpdate);
    return () => {
      editor.off("update", handleEditorUpdate);
    };
  }, [editor, dispatch, componentId, component.content]);

  useEffect(() => {
    if (selectedId !== id) return;

    const handleClickOutside = async (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      const isInside = targetRef.current?.contains(target);
      const isMoveable = !!target.closest(".moveable-control-box");
      const isMuiSelect = !!target.closest(".MuiPopover-root");

      if (!isInside && !isMoveable && !isMuiSelect) {
        const latestComponent = componentSelectors.selectById(
          store.getState() as RootState,
          componentId
        );
        if (latestComponent !== component) {
          const updateRequest: UpdateComponentRequest = {
            id: latestComponent.id,
            width: latestComponent.width,
            height: latestComponent.height,
            x: latestComponent.x,
            y: latestComponent.y,
            rotation: latestComponent.rotation,
            zIndex: latestComponent.zIndex,
            content: latestComponent.content,
          };
          await dispatch(updateComponent(updateRequest));
        }
        setSelectedId(null);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);
    return () =>
      document.removeEventListener("pointerdown", handleClickOutside);
  }, [selectedId, id, setSelectedId]);

  useLayoutEffect(() => {
    if (selectedId === id) {
      moveableRef.current?.updateRect();
    }
  }, [component.width, component.height]);

  const applyTextCommand = useCallback(
    (callback: () => void) => {
      editor?.commands.focus();
      editor?.commands.selectAll();
      callback();
      editor?.commands.setTextSelection(editor.state.selection.to);
    },
    [editor]
  );

  const handleClick = () => setSelectedId(id);

  const handleChange = useCallback(
    (updates: Partial<ComponentView>) => {
      throttledHandleChange(
        dispatch,
        componentId,
        component,
        updates,
        sendLiveUpdate
      );
    },
    [dispatch, componentId, component]
  );

  const handleDelete = async () => {
    await dispatch(deleteComponent(initialProperties.id));

    const hubConnection = signalRManager.getConnection(HUB_NAMES.WORKSHEET);
    if (hubConnection) {
      const request: ComponentDeletedRequest = {
        WorksheetId: Number(worksheetId),
        ComponentId: initialProperties.id,
      };
      await hubConnection.invoke("ComponentDeleted", request);
    }
  };

  const sendLiveUpdate = useCallback(
    (updatedProperties: ComponentView) => {
      const hubConnection = signalRManager.getConnection(HUB_NAMES.WORKSHEET);
      if (hubConnection && worksheetId) {
        throttledSendLiveUpdate(updatedProperties, worksheetId, hubConnection);
      }
    },
    [worksheetId]
  );

  return (
    <>
      <Box
        ref={targetRef}
        onClick={handleClick}
        style={{
          position: "absolute",
          width: `${component.width}px`,
          height: `${component.height}px`,
          transform: getTransform(component.x, component.y, component.rotation),
          zIndex: component.zIndex,
        }}
      >
        {selectedId === id && (
          <TextEditorContainer>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Font Family</InputLabel>
              <Select
                value={
                  editor?.getAttributes("textStyle")?.fontFamily ??
                  FontFamilies[0]
                }
                label="Font Family"
                onChange={(event) =>
                  applyTextCommand(() =>
                    editor?.commands.setFontFamily(event.target.value as string)
                  )
                }
              >
                {FontFamilies.map((font) => (
                  <MenuItem
                    key={font}
                    value={font}
                    style={{ fontFamily: font }}
                  >
                    {font}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 80 }}>
              <InputLabel>Font Size</InputLabel>
              <Select
                value={
                  editor?.getAttributes("textStyle")?.fontSize ?? FontSizes[0]
                }
                label="Font Size"
                onChange={(event) =>
                  applyTextCommand(() =>
                    editor?.commands.setFontSize(event.target.value as string)
                  )
                }
              >
                {FontSizes.map((size) => (
                  <MenuItem key={size} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Z-Index"
              type="number"
              size="small"
              variant="outlined"
              value={component.zIndex}
              onChange={(e) =>
                handleChange({
                  zIndex: Math.max(1, parseInt(e.target.value) || 0),
                })
              }
              onKeyDown={(e) =>
                e.key === "Enter" && (e.target as HTMLInputElement).blur()
              }
              sx={{ width: 100 }}
            />

            <IconButton
              variant="outlined"
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
            >
              <FormatListBulletedIcon />
            </IconButton>

            <IconButton
              variant="outlined"
              onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            >
              <FormatListNumberedIcon />
            </IconButton>

            <IconButton
              variant="outlined"
              onClick={() =>
                applyTextCommand(() => editor?.commands.toggleBold())
              }
            >
              <FormatBoldIcon />
            </IconButton>

            <IconButton
              variant="outlined"
              onClick={() =>
                applyTextCommand(() => editor?.commands.toggleItalic())
              }
            >
              <FormatItalicIcon />
            </IconButton>

            <IconButton
              variant="outlined"
              onClick={() =>
                applyTextCommand(() => editor?.commands.toggleUnderline())
              }
            >
              <FormatUnderlinedIcon />
            </IconButton>

            <IconButton
              variant="outlined"
              onClick={() =>
                applyTextCommand(() => editor?.commands.toggleStrike())
              }
            >
              <FormatStrikethroughIcon />
            </IconButton>

            <IconButton
              onClick={() =>
                applyTextCommand(() => editor?.commands.setTextAlign("left"))
              }
            >
              <FormatAlignLeftIcon />
            </IconButton>

            <IconButton
              onClick={() =>
                applyTextCommand(() => editor?.commands.setTextAlign("center"))
              }
            >
              <FormatAlignCenterIcon />
            </IconButton>

            <IconButton
              onClick={() =>
                applyTextCommand(() => editor?.commands.setTextAlign("right"))
              }
            >
              <FormatAlignRightIcon />
            </IconButton>

            <IconButton
              onClick={() =>
                applyTextCommand(() => editor?.commands.setTextAlign("justify"))
              }
            >
              <FormatAlignJustifyIcon />
            </IconButton>

            <ColorPicker
              value={
                rgbToHex(editor?.getAttributes("textStyle")?.color) ?? "#000000"
              }
              onChange={(color: string) =>
                applyTextCommand(() => editor?.commands.setColor(color))
              }
            />

            <IconButton
              color="error"
              tooltipTitle="Delete"
              onClick={handleDelete}
            >
              <DeleteIcon />
            </IconButton>
          </TextEditorContainer>
        )}

        <EditorContent editor={editor} data-sync-size />
      </Box>

      {selectedId === id && (
        <Moveable
          ref={moveableRef}
          target={targetRef}
          origin={false}
          draggable
          resizable
          rotatable
          throttleDrag={1}
          throttleResize={1}
          throttleRotate={1}
          rotationPosition="bottom"
          renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
          onDragStart={({ inputEvent }) => {
            const target = inputEvent?.target as HTMLElement;

            if (
              target.closest(".text-editor-container") &&
              (["INPUT", "SELECT", "TEXTAREA"].includes(target.tagName) ||
                target.classList.contains("MuiSelect-select") ||
                target.classList.contains("MuiSelect-icon"))
            ) {
              return false;
            }

            if (target.closest(".text-editor-container")) {
              inputEvent.stopPropagation();
            }
          }}
          onDrag={({ beforeTranslate }) => {
            const el = targetRef.current;
            const bounds = boundsRef.current?.getBoundingClientRect();
            const comp = el?.getBoundingClientRect();
            if (!el || !bounds || !comp) return;

            const [x, y] = beforeTranslate;
            const maxX = bounds.width - comp.width;
            const maxY = bounds.height - comp.height;
            const clampedX = Math.max(0, Math.min(x, maxX));
            const clampedY = Math.max(0, Math.min(y, maxY));

            el.style.transform = getTransform(
              clampedX,
              clampedY,
              component.rotation
            );

            handleChange({ x: clampedX, y: clampedY });
          }}
          onResize={({ width, height, drag }) => {
            const el = targetRef.current;
            const bounds = boundsRef.current?.getBoundingClientRect();
            if (!el || !bounds) return;

            const [x, y] = drag.beforeTranslate;

            el.style.width = `${width}px`;
            el.style.height = `${height}px`;
            el.style.transform = getTransform(x, y, component.rotation);

            const inner = el.querySelector("[data-sync-size]") as HTMLElement;
            if (inner) {
              inner.style.width = "100%";
              inner.style.height = "100%";
            }

            handleChange({ width, height, x, y });
          }}
          onRotate={({ beforeRotate, drag }) => {
            const el = targetRef.current;
            if (!el) return;

            const rotation = beforeRotate;
            const [x, y] = drag.beforeTranslate;

            el.style.transform = getTransform(x, y, rotation);

            handleChange({ rotation, x, y });
          }}
        />
      )}
    </>
  );
}
