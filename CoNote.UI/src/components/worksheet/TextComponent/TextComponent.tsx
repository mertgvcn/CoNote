import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
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
//models
import { ComponentView } from "../../../models/views/ComponentView";
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
//components
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import IconButton from "../../ui/IconButton";
import ColorPicker from "../../ui/ColorPicker";
import TextEditorContainer from "../TextEditorContainer";

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
  const targetRef = useRef<HTMLDivElement>(null);
  const moveableRef = useRef<Moveable>(null);

  const [properties, setProperties] = useState({
    width: initialProperties.width,
    height: initialProperties.height,
    x: initialProperties.x,
    y: initialProperties.y,
    rotation: initialProperties.rotation,
    zIndex: initialProperties.zIndex,
    content: initialProperties.content,
    textColor: initialProperties.style?.textColor,
    fontSize: initialProperties.style?.fontSize,
    fontFamily: initialProperties.style?.fontFamily,
  });

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
    content: initialProperties.content,
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

  const applyTextCommand = (callback: () => void) => {
    editor?.commands.focus();
    editor?.commands.selectAll();
    callback();
    editor?.commands.setTextSelection(editor.state.selection.to);
  };

  const handleClick = () => setSelectedId(id);

  const handleChange = (key: keyof typeof properties, value: any) => {
    setProperties((prev) => ({
      ...prev,
      [key]: value,
    }));

    if (key === "fontSize") {
      applyTextCommand(() => editor?.commands.setFontSize(value));
    } else if (key === "fontFamily") {
      applyTextCommand(() => editor?.commands.setFontFamily(value));
    } else if (key === "textColor") {
      applyTextCommand(() => editor?.commands.setColor(value));
    }
  };

  useEffect(() => {
    if (selectedId !== id) return;

    const handleClickOutside = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      const isInside = targetRef.current?.contains(target);
      const isMoveable = !!target.closest(".moveable-control-box");
      const isMuiSelect = !!target.closest(".MuiPopover-root");

      if (!isInside && !isMoveable && !isMuiSelect) {
        setSelectedId(null);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);
    return () =>
      document.removeEventListener("pointerdown", handleClickOutside);
  }, [selectedId, id]);

  useLayoutEffect(() => {
    if (selectedId === id) {
      moveableRef.current?.updateRect();
    }
  }, [properties.width, properties.height]);

  return (
    <>
      <Box
        ref={targetRef}
        onClick={handleClick}
        style={{
          position: "absolute",
          width: `${properties.width}px`,
          height: `${properties.height}px`,
          transform: getTransform(
            properties.x,
            properties.y,
            properties.rotation
          ),
          zIndex: properties.zIndex,
        }}
      >
        {selectedId === id && (
          <TextEditorContainer>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Font Family</InputLabel>
              <Select
                value={properties.fontFamily}
                label="Font Family"
                onChange={(e) => handleChange("fontFamily", e.target.value)}
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
                value={properties.fontSize}
                label="Font Size"
                onChange={(e) => handleChange("fontSize", e.target.value)}
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
              value={properties.zIndex}
              onChange={(e) =>
                handleChange("zIndex", Math.max(1, parseInt(e.target.value)))
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
              value={properties.textColor!}
              onChange={(color: string) => handleChange("textColor", color)}
            />
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
              properties.rotation
            );

            setProperties((prev) => ({
              ...prev,
              x: clampedX,
              y: clampedY,
            }));
          }}
          onResize={({ width, height, drag }) => {
            const el = targetRef.current;
            const bounds = boundsRef.current?.getBoundingClientRect();
            if (!el || !bounds) return;

            let [x, y] = drag.beforeTranslate;

            el.style.width = `${width}px`;
            el.style.height = `${height}px`;
            el.style.transform = getTransform(x, y, properties.rotation);

            const inner = el.querySelector("[data-sync-size]") as HTMLElement;
            if (inner) {
              inner.style.width = "100%";
              inner.style.height = "100%";
            }

            setProperties((prev) => ({
              ...prev,
              width,
              height,
              x,
              y,
            }));
          }}
          onRotate={({ beforeRotate, drag }) => {
            const el = targetRef.current;
            if (!el) return;

            const rotation = beforeRotate;
            const [x, y] = drag.beforeTranslate;

            el.style.transform = getTransform(x, y, rotation);

            setProperties((prev) => ({
              ...prev,
              x,
              y,
              rotation,
            }));
          }}
        />
      )}
    </>
  );
}
