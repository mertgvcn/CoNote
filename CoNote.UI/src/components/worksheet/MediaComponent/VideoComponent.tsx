import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
//moveable
import Moveable from "react-moveable";
//tiptap
import { EditorContent, useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Youtube from "@tiptap/extension-youtube";
//utils
import { getTransform } from "../../../utils/getTransform";
//models
import { ComponentView } from "../../../models/views/ComponentView";
//icons
import LinkIcon from "@mui/icons-material/Link";
//components
import { Box, TextField } from "@mui/material";
import TextEditorContainer from "../TextEditorContainer";
import IconButton from "../../ui/IconButton";

type VideoComponentPropsType = {
  id: number;
  selectedId: number | null;
  setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
  boundsRef: React.RefObject<HTMLElement | null>;
  initialProperties: ComponentView;
};

const VideoComponent = ({
  id,
  selectedId,
  setSelectedId,
  boundsRef,
  initialProperties
}: VideoComponentPropsType) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const moveableRef = useRef<Moveable>(null);

  const [properties, setProperties] = useState({
    width: initialProperties.width,
    height: initialProperties.height,
    x: initialProperties.x,
    y: initialProperties.y,
    zIndex: initialProperties.zIndex,
  });

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Youtube.configure({
        nocookie: true,
      }),
    ],
    content: initialProperties.content,
    editable: false,
    editorProps: {
      attributes: {
        spellcheck: "false",
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

  const handleClick = () => {
    setSelectedId(id);
  };

  const handleChange = <K extends keyof typeof properties>(
    key: K,
    value: (typeof properties)[K]
  ) => {
    setProperties((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAddYoutube = () => {
    const url = prompt("Enter YouTube URL");
    if (url && editor) {
      editor.commands.clearContent();
      editor.commands.insertContentAt(0, "<p> </p>");
      editor.commands.setYoutubeVideo({
        src: url,
        width: properties.width,
        height: properties.height - 24,
      });
    }
  };

  useEffect(() => {
    if (selectedId !== id) return;

    const handleClickOutside = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      const isInside = targetRef.current?.contains(target);
      const isMoveable = !!target.closest(".moveable-control-box");

      if (!isInside && !isMoveable) {
        setSelectedId(null);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);
    return () =>
      document.removeEventListener("pointerdown", handleClickOutside);
  }, [selectedId, id, setSelectedId]);

  useEffect(() => {
    if (!editor) return;

    const iframe = targetRef.current?.querySelector("iframe");

    if (iframe) {
      iframe.setAttribute("width", `${properties.width}`);
      iframe.setAttribute("height", `${properties.height - 24}`);
    }
  }, [properties.width, properties.height, editor]);

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
          transform: getTransform(properties.x, properties.y),
          zIndex: properties.zIndex,
          cursor: "move",
        }}
      >
        {selectedId === id && (
          <TextEditorContainer>
            <TextField
              label="Width"
              type="number"
              size="small"
              variant="outlined"
              value={properties.width}
              onChange={(e) =>
                handleChange("width", parseInt(e.target.value) || 0)
              }
              onKeyDown={(e) =>
                e.key === "Enter" && (e.target as HTMLInputElement).blur()
              }
              sx={{ width: 100 }}
            />

            <TextField
              label="Height"
              type="number"
              size="small"
              variant="outlined"
              value={properties.height}
              onChange={(e) =>
                handleChange("height", parseInt(e.target.value) || 0)
              }
              onKeyDown={(e) =>
                e.key === "Enter" && (e.target as HTMLInputElement).blur()
              }
              sx={{ width: 100 }}
            />

            <TextField
              label="Z-Index"
              type="number"
              size="small"
              variant="outlined"
              value={properties.zIndex}
              onChange={(e) =>
                handleChange("zIndex", Math.max(1, parseInt(e.target.value)))
              }
              onKeyDown={(e) =>
                e.key === "Enter" && (e.target as HTMLInputElement).blur()
              }
              sx={{ width: 100 }}
            />

            <IconButton variant="outlined" onClick={handleAddYoutube}>
              <LinkIcon />
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
          throttleDrag={1}
          throttleResize={1}
          renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
          onDragStart={({ inputEvent }) => {
            const target = inputEvent?.target as HTMLElement;
            if (target.closest(".text-editor-container")) {
              inputEvent.stopPropagation();
              return false;
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

            el.style.transform = getTransform(clampedX, clampedY);

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
            el.style.transform = getTransform(x, y);

            setProperties((prev) => ({
              ...prev,
              width,
              height,
              x,
              y,
            }));
          }}
        />
      )}
    </>
  );
};

export default VideoComponent;
