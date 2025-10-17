import React, { useRef, useState, useEffect } from "react";

const BoardCanvas = ({ width = 1200, height = 600, slides, currentSlide, tool, updateSlide }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentLine, setCurrentLine] = useState([]);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    drawSlide(ctx, slides[currentSlide]);
  }, [slides, currentSlide]);

  const startDrawing = (e) => {
    setIsDrawing(true);
    const pos = getMousePos(e);
    setCurrentLine([pos]);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const pos = getMousePos(e);
    setCurrentLine((prev) => [...prev, pos]);
    const ctx = canvasRef.current.getContext("2d");
    drawSlide(ctx, slides[currentSlide]);
    drawLine(ctx, currentLine.concat([pos]), tool);
  };

  const endDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    updateSlide(currentSlide, {
      tool,
      points: currentLine
    });
    setCurrentLine([]);
  };

  const getMousePos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const drawSlide = (ctx, objects) => {
    ctx.clearRect(0, 0, width, height);
    objects.forEach((obj) => drawLine(ctx, obj.points, obj.tool));
  };

  const drawLine = (ctx, points, tool) => {
    if (points.length < 2) return;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.strokeStyle = tool === "pen" ? "#000" : "#fff";
    ctx.lineWidth = tool === "pen" ? 2 : 10;
    ctx.lineCap = "round";
    ctx.stroke();
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ border: "1px solid #ccc", cursor: tool === "pen" ? "crosshair" : "pointer" }}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={endDrawing}
      onMouseLeave={endDrawing}
    />
  );
};

export default BoardCanvas;
