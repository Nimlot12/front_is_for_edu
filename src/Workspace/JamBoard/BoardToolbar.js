import React from "react";

const BoardToolbar = ({
  tool,
  setTool,
  prevSlide,
  nextSlide,
  clearSlide,
  currentSlide,
  totalSlides,
  followTeacher,
  setFollowTeacher
}) => {
  return (
    <div className="board-toolbar" style={{ marginBottom: "8px" }}>
      <button onClick={prevSlide} disabled={currentSlide === 0}>
        Prev
      </button>
      <button onClick={nextSlide} disabled={currentSlide === totalSlides - 1}>
        Next
      </button>
      <button
        onClick={() => setTool("pen")}
        style={{ fontWeight: tool === "pen" ? "bold" : "normal" }}
      >
        Pen
      </button>
      <button
        onClick={() => setTool("eraser")}
        style={{ fontWeight: tool === "eraser" ? "bold" : "normal" }}
      >
        Eraser
      </button>
      <button onClick={clearSlide}>Clear Slide</button>

      <label style={{ marginLeft: "10px" }}>
        <input
          type="checkbox"
          checked={followTeacher}
          onChange={(e) => setFollowTeacher(e.target.checked)}
        />
        Следовать за преподавателем
      </label>

      <span style={{ marginLeft: "10px" }}>
        Слайд: {currentSlide + 1} / {totalSlides}
      </span>
    </div>
  );
};

export default BoardToolbar;
