import { useState } from "react";

type Props = {
  src: string;
};

export const ImageViewer = ({ src, }: Props) => {

  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0});
  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0});

  return (
    <img
      src={src}
      alt=""
      style={{
        maxWidth: "100%",
        maxHeight: "100%",
        objectFit: "contain",
        transform: `
          translate(
          ${position.x}px,
          ${position.y}px
          )
          scale(${scale})
        `,
        cursor:
          scale > 1
            ? dragging
              ? "grabbing"
              : "grab"
            : "default",
      }}
      draggable={false}
      onWheel={(e) => {
        e.preventDefault();

        setScale(prev => {
          const next = prev - e.deltaY * 0.001;

          return Math.min(Math.max(next, 1), 5);
        });
      }}
      onMouseDown={(e) => {
        setDragging(true);

        setStart({
          x: e.clientX,
          y: e.clientY,
        });
      }}
      onMouseMove={(e) => {
        if(!dragging) return;

        setPosition(prev => ({
          x: prev.x + (e.clientX - start.x),
          y: prev.y + (e.clientY - start.y),
        }));

        setStart({
          x: e.clientX,
          y: e.clientY,
        });
      }}

      onDoubleClick={() => {
        if (scale === 1) {
          setScale(2);
        } else {
          setScale(1);

          setPosition({
            x: 0,
            y: 0,
          });
        }
      }}

      onMouseUp={() => setDragging(false)}
    />
  );
};