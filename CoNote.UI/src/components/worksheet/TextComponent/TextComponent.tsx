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
// components
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
    height: 100,
  });
  const [textColor, setTextColor] = useState("#000000");

  const editor = useEditor({
    extensions: [StarterKit, TextStyle, Color],
    content: "<p>Edit this text</p>",
    editable: true,
    editorProps: {
      attributes: {
        style: `
          outline: none;
          height: 100%;
          width: 100%;
          margin: 0px;
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

      if (!isInsideText && !isInsideMoveable) {
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

  const toggleAllBold = () => {
    editor?.commands.focus();
    editor?.commands.selectAll();
    editor?.commands.toggleBold();
    editor?.commands.setTextSelection(editor.state.selection.to);
  };

  const toggleAllItalic = () => {
    editor?.commands.focus();
    editor?.commands.selectAll();
    editor?.commands.toggleItalic();
    editor?.commands.setTextSelection(editor.state.selection.to);
  };

  const handleChangeTextColor = (color: string) => {
    setTextColor(color);
    editor?.commands.focus();
    editor?.commands.selectAll();
    editor?.commands.setColor(color);
    editor?.commands.setTextSelection(editor.state.selection.to);
  };

  return (
    <>
      <div
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
            <IconButton onClick={toggleAllBold} variant="outlined" size="small">
              <FormatBoldIcon />
            </IconButton>
            <IconButton
              onClick={toggleAllItalic}
              variant="outlined"
              size="small"
            >
              <FormatItalicIcon />
            </IconButton>
            <ColorPicker value={textColor} onChange={handleChangeTextColor} />
          </TextEditorContainer>
        )}
        <EditorContent editor={editor} />
      </div>

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
          rotationPosition={"top-right"}
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

            const transform = `translate(${clampedX}px, ${clampedY}px)`;
            el.style.transform = transform;

            setFrame((prev) => ({
              ...prev,
              transform,
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
            const direction = e.direction;

            if (
              direction[0] === -1 &&
              compRect.left + e.delta[0] < bounds.left
            ) {
              width = compRect.right - bounds.left;
            }

            if (direction[1] === -1 && compRect.top + e.delta[1] < bounds.top) {
              height = compRect.bottom - bounds.top;
            }

            if (
              direction[0] === 1 &&
              compRect.right + e.delta[0] > bounds.right
            ) {
              width = bounds.right - compRect.left;
            }

            if (
              direction[1] === 1 &&
              compRect.bottom + e.delta[1] > bounds.bottom
            ) {
              height = bounds.bottom - compRect.top;
            }

            const transform = `translate(${x}px, ${y}px)`;
            el.style.width = `${width}px`;
            el.style.height = `${height}px`;
            el.style.transform = transform;

            setFrame({
              width,
              height,
              transform,
            });
          }}
          onRotate={(e) => {
            const el = targetRef.current;
            if (!el) return;

            const transform = e.drag.transform;
            el.style.transform = transform;

            setFrame((prev) => ({
              ...prev,
              transform,
            }));
          }}
        />
      )}
    </>
  );
}
