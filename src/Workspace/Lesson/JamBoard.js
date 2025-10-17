import React, { useEffect, useState } from "react";
import BoardCanvas from "../JamBoard/BoardCanvas";
import BoardToolbar from "../JamBoard/BoardToolbar";


const JamBoard = () => {
  const totalSlides = 3;
  const [slides, setSlides] = useState(Array.from({ length: totalSlides }, () => []));
  const [currentSlide, setCurrentSlide] = useState(0);
  const [tool, setTool] = useState("pen");
  const [followTeacher, setFollowTeacher] = useState(true);

  const updateSlide = (slideIndex, obj) => {
    setSlides((prev) => {
      const newSlides = [...prev];
      newSlides[slideIndex] = [...newSlides[slideIndex], obj];
      return newSlides;
    });
  };

  const prevSlide = () => setCurrentSlide((s) => Math.max(0, s - 1));
  const nextSlide = () => setCurrentSlide((s) => Math.min(totalSlides - 1, s + 1));
  const clearSlide = () =>
    setSlides((prev) => {
      const newSlides = [...prev];
      newSlides[currentSlide] = [];
      return newSlides;
    });

  return (
    <div className="JamBoard-container">
      <div className="board-header"><strong>Интерактивная доска</strong></div>

      <BoardToolbar
        tool={tool}
        setTool={setTool}
        prevSlide={prevSlide}
        nextSlide={nextSlide}
        clearSlide={clearSlide}
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        followTeacher={followTeacher}
        setFollowTeacher={setFollowTeacher}
      />

      <div className="board-area">
        <BoardCanvas
          slides={slides}
          currentSlide={currentSlide}
          tool={tool}
          updateSlide={updateSlide}
        />
      </div>
    </div>
  );
};

export default JamBoard;