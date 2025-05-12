import * as React from "react";
import { useEffect, useRef, useState } from "react";
// icons
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
// moveable
import Moveable from "react-moveable";
// tiptap
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { FontSize, FontSizes } from "../../../extensions/tiptap/FontSize";
import {
  FontFamily,
  FontFamilies,
} from "../../../extensions/tiptap/FontFamily";
// components
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import TextEditorContainer from "../TextEditorContainer";
import IconButton from "../../ui/IconButton";
import ColorPicker from "../../ui/ColorPicker";

type TextComponentPropsType = {
  id: number;
  selectedId: number | null;
  setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
  boundsRef: React.RefObject<HTMLElement | null>;
};

export default function TextComponent({
  id,
  selectedId,
  setSelectedId,
  boundsRef,
}: TextComponentPropsType) {
  const targetRef = useRef<HTMLDivElement>(null);
  const moveableRef = useRef<Moveable>(null);

  const [frame, setFrame] = useState({
    transform: "translate(100px, 100px) rotate(0deg)",
    width: 200,
    height: 24,
  });
  const [fontSize, setFontSize] = useState(
    FontSizes.find((size) => size === "16px") || FontSizes[0]
  );
  const [fontFamily, setFontFamily] = useState(FontFamilies[0]);
  const [textColor, setTextColor] = useState("#000000");

  const editor = useEditor({
    extensions: [StarterKit, TextStyle, Color, FontSize, FontFamily],
    content: "<p>Edit this text</p>",
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

  // dışarı tıklanınca seçimi kaldır
  useEffect(() => {
    if (selectedId !== id) return;

    const handleClickOutside = (event: PointerEvent) => {
      const target = event.target as HTMLElement;

      const isInsideText = targetRef.current?.contains(target);
      const isInsideMoveable = !!target.closest(".moveable-control-box");
      const isInsideMuiSelect =
        !!target.closest(".MuiPopover-root") ||
        !!target.closest(".MuiSelect-root");

      if (!isInsideText && !isInsideMoveable && !isInsideMuiSelect) {
        setSelectedId(null);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [selectedId, id, setSelectedId]);

  const handleClick = () => {
    setSelectedId(id);
  };

  const applyTextCommand = (callback: () => void) => {
    editor?.commands.focus();
    editor?.commands.selectAll();
    callback();
    editor?.commands.setTextSelection(editor.state.selection.to);
  };

  const handleChangeFontFamily = (family: string) => {
    setFontFamily(family);
    applyTextCommand(() => editor?.commands.setFontFamily(family));
  };

  const handleChangeFontSize = (size: string) => {
    setFontSize(size);
    applyTextCommand(() => editor?.commands.setFontSize(size));
  };

  const handleChangeTextColor = (color: string) => {
    setTextColor(color);
    applyTextCommand(() => editor?.commands.setColor(color));
  };

  return (
    <>
      <Box
        className="target"
        ref={targetRef}
        onClick={handleClick}
        style={{
          position: "absolute",
          width: `${frame.width}px`,
          height: `${frame.height}px`,
          transform: frame.transform,
        }}
      >
        {selectedId === id && (
          <TextEditorContainer>
            <Box sx={{ minWidth: 200 }}>
              <FormControl fullWidth>
                <InputLabel id="font-family-select-label">
                  Font Family
                </InputLabel>
                <Select
                  labelId="font-family-select-label"
                  id="font-family-select"
                  value={fontFamily}
                  label="Font Family"
                  size="small"
                  onChange={(e) => handleChangeFontFamily(e.target.value)}
                  MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
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
            </Box>

            <Box sx={{ minWidth: 30 }}>
              <FormControl fullWidth>
                <InputLabel id="font-size-select-label">Font Size</InputLabel>
                <Select
                  labelId="font-size-select-label"
                  id="font-size-select"
                  value={fontSize}
                  label="Font Size"
                  size="small"
                  MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
                  onChange={(e) => handleChangeFontSize(e.target.value)}
                >
                  {FontSizes.map((size) => (
                    <MenuItem key={size} value={size}>
                      {size}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <IconButton
              onClick={() =>
                applyTextCommand(() => editor?.commands.toggleBold())
              }
              variant="outlined"
              size="medium"
            >
              <FormatBoldIcon />
            </IconButton>

            <IconButton
              onClick={() =>
                applyTextCommand(() => editor?.commands.toggleItalic())
              }
              variant="outlined"
              size="medium"
            >
              <FormatItalicIcon />
            </IconButton>

            <ColorPicker value={textColor} onChange={handleChangeTextColor} />
          </TextEditorContainer>
        )}
        <EditorContent data-sync-size editor={editor} />
      </Box>

      {selectedId === id && (
        <Moveable
          ref={moveableRef}
          target={targetRef}
          origin={false}
          draggable
          throttleDrag={1}
          edgeDraggable={false}
          resizable
          keepRatio={false}
          throttleResize={1}
          renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
          rotatable
          throttleRotate={0}
          rotationPosition={"bottom"}
          onDrag={(e) => {
            const [x, y] = e.beforeTranslate;
            const el = targetRef.current;
            const bounds = boundsRef.current?.getBoundingClientRect();
            const comp = el?.getBoundingClientRect();

            if (!el || !bounds || !comp) return;

            const maxX = bounds.width - comp.width;
            const maxY = bounds.height - comp.height;

            const clampedX = Math.max(0, Math.min(x, maxX));
            const clampedY = Math.max(0, Math.min(y, maxY));

            el.style.transform = `translate(${clampedX}px, ${clampedY}px)`;

            setFrame((prev) => ({
              ...prev,
              transform: el.style.transform,
            }));
          }}
          onResize={(e) => {
            const el = targetRef.current;
            const bounds = boundsRef.current?.getBoundingClientRect();
            if (!el || !bounds) return;

            let [x, y] = e.drag.beforeTranslate;
            let width = e.width;
            let height = e.height;

            const compRect = el.getBoundingClientRect();
            const dir = e.direction;

            if (dir[0] === -1 && compRect.left + e.delta[0] < bounds.left)
              width = compRect.right - bounds.left;
            if (dir[1] === -1 && compRect.top + e.delta[1] < bounds.top)
              height = compRect.bottom - bounds.top;
            if (dir[0] === 1 && compRect.right + e.delta[0] > bounds.right)
              width = bounds.right - compRect.left;
            if (dir[1] === 1 && compRect.bottom + e.delta[1] > bounds.bottom)
              height = bounds.bottom - compRect.top;

            el.style.width = `${width}px`;
            el.style.height = `${height}px`;
            el.style.transform = `translate(${x}px, ${y}px)`;

            const inner = el.querySelector("[data-sync-size]") as HTMLElement;
            if (inner) {
              inner.style.width = "100%";
              inner.style.height = "100%";
            }

            setFrame({ width, height, transform: el.style.transform });
          }}
          onRotate={(e) => {
            const el = targetRef.current;
            if (!el) return;

            el.style.transform = e.drag.transform;
            setFrame((prev) => ({
              ...prev,
              transform: el.style.transform,
            }));
          }}
        />
      )}
    </>
  );
}
