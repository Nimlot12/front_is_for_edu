import React, { useRef, useEffect, useState } from "react";

const BoardCanvas = ({ width, height, slide, tool, onDraw }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentLine, setCurrentLine] = useState([]);

  // Перерисовка при смене слайда
  useEffect(() => {
    if (!slide?.state) return;
    const ctx = canvasRef.current.getContext("2d");
    drawSlide(ctx, slide.state);
  }, [slide]);

  const getMousePos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return [e.clientX - rect.left, e.clientY - rect.top];
  };

  const startDrawing = (e) => {
    setIsDrawing(true);
    setCurrentLine([getMousePos(e)]);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const pos = getMousePos(e);
    setCurrentLine((prev) => [...prev, pos]);

    const ctx = canvasRef.current.getContext("2d");
    drawSlide(ctx, slide.state); // перерисуем всё
    drawTempLine(ctx, [...currentLine, pos], tool);
  };

  const endDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    const newElement = {
      id: Date.now(),
      type: "line",
      points: currentLine,
      color: tool === "pen" ? "#000" : "#fff",
      thickness: tool === "pen" ? 2 : 10,
    };

    // добавляем на слайд локально
    slide.state.elements = [...(slide.state.elements || []), newElement];

    if (onDraw) onDraw(newElement);

    setCurrentLine([]);
  };

  const drawTempLine = (ctx, points, tool) => {
    if (points.length < 2) return;
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    points.slice(1).forEach(([x, y]) => ctx.lineTo(x, y));
    ctx.strokeStyle = tool === "pen" ? "#000" : "#fff";
    ctx.lineWidth = tool === "pen" ? 2 : 10;
    ctx.lineCap = "round";
    ctx.stroke();
  };

  const drawSlide = (ctx, state) => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = state.background || "#fff";
    ctx.fillRect(0, 0, width, height);

    (state.elements || []).forEach((el) => {
      switch (el.type) {
        case "rectangle":
          ctx.fillStyle = el.color || "#000";
          ctx.fillRect(el.x, el.y, el.width, el.height);
          break;
        case "line":
          if (!el.points?.length) return;
          ctx.beginPath();
          ctx.moveTo(el.points[0][0], el.points[0][1]);
          el.points.slice(1).forEach(([x, y]) => ctx.lineTo(x, y));
          ctx.strokeStyle = el.color || "#000";
          ctx.lineWidth = el.thickness || 2;
          ctx.stroke();
          break;
        case "text":
          ctx.fillStyle = el.color || "#000";
          ctx.font = `${el.fontSize || 16}px sans-serif`;
          ctx.fillText(el.text, el.x, el.y);
          break;
        default:
          break;
      }
    });
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ border: "1px solid #ccc", display: "block", margin: "0 auto" }}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={endDrawing}
      onMouseLeave={endDrawing}
    />
  );
};

export default BoardCanvas;
