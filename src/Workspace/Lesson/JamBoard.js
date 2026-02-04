import React, { useEffect, useState, useRef } from "react";
import BoardCanvas from "../JamBoard/BoardCanvas";
import BoardToolbar from "../JamBoard/BoardToolbar";

const JamBoard = ({ lessonId }) => {
  const [board, setBoard] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [tool, setTool] = useState("pen");
  const ws = useRef(null);
  const isWsReady = useRef(false);
  const pendingOps = useRef([]); // операции до открытия WS

  // Загружаем доску по lessonId
  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await fetch(
          `http://localhost:8000/whiteboards/get_by_lesson/?lesson_id=${lessonId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await res.json();
        setBoard(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBoard();
  }, [lessonId]);

  // Подключаем WS
  useEffect(() => {
    if (!board) return;

    const token = localStorage.getItem("access_token");
    ws.current = new WebSocket(`ws://localhost:8000/whiteboards/ws/board/${board.id}?token=${token}`);

    ws.current.onopen = () => {
      console.log("WebSocket connected");
      isWsReady.current = true;

      // Отправляем все накопленные операции
      pendingOps.current.forEach(op => ws.current.send(JSON.stringify(op)));
      pendingOps.current = [];
    };

    ws.current.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      setBoard((prevBoard) => {
        const slides = prevBoard.slides.map((s) => {
          if (s.id === msg.slide_id) {
            return {
              ...s,
              state: {
                ...s.state,
                elements: [...(s.state.elements || []), msg.op_data],
              },
            };
          }
          return s;
        });
        return { ...prevBoard, slides };
      });
    };

    ws.current.onclose = () => {
      isWsReady.current = false;
    };

    return () => ws.current.close();
  }, [board]);

  if (!board) return <div>Загрузка доски...</div>;

  const slides = board.slides || [];
  const currentSlide = slides[currentSlideIndex];

  const nextSlide = () => setCurrentSlideIndex((i) => Math.min(slides.length - 1, i + 1));
  const prevSlide = () => setCurrentSlideIndex((i) => Math.max(0, i - 1));

  const sendOp = (opData) => {
    const message = { slide_id: currentSlide.id, op_data: opData };
    if (ws.current && isWsReady.current) {
      ws.current.send(JSON.stringify(message));
    } else {
      pendingOps.current.push(message); // буферизуем, пока WS не готов
    }
  };

  return (
    <div className="JamBoard-container">
      <div className="board-header"><strong>Интерактивная доска</strong></div>

      <BoardToolbar
        tool={tool}
        setTool={setTool}
        prevSlide={prevSlide}
        nextSlide={nextSlide}
        currentSlide={currentSlideIndex}
        totalSlides={slides.length}
      />

      <div className="board-area">
        <BoardCanvas
          width={1200}
          height={600}
          slide={currentSlide}
          tool={tool}
          onDraw={sendOp}
        />
      </div>
    </div>
  );
};

export default JamBoard;
