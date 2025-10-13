import React, { useEffect, useState } from "react";


const Lesson_navbar = ({ lessonId }) => {

    const [tasks, setTasks] = useState([]);
    

     useEffect(() => {
        const token = localStorage.getItem("access_token");
        fetch(`http://localhost:8000/lessons_text/get_text_tasks_by_lesson/${lessonId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error("Ошибка загрузки задач");
                return res.json();
            })
            .then((data) => {
                setTasks(data);
            })
            .catch((err) => console.error("Ошибка:", err));
    }, [lessonId]);


    return (
        <div className="lesson-nav">
                    <div className="nav-top">
                        <button className="nav-toggle active" data-target="board" title="Доска" aria-label="Интерактивная доска">
                            {/* <!-- board icon --> */}
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="3" y="4" width="18" height="14" rx="2" ry="2"></rect>
                                <path d="M8 20v-4h8v4"></path>
                            </svg>
                        </button>
                        <div className="assignments-list" id="assignmentsList">
                             {tasks.length > 0 ? (
                                tasks.map((task) => (
                                    <button
                                        key={task.id}
                                        className={`assignment-btn`}
                                        aria-label={task.name}
                                        title={task.name}
                                        onClick={() => console.log("Открыть задачу:", task.id)}
                                    >
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M12 2l3 6 6 .5-4.5 3.5L18 20l-6-4-6 4 1.5-7L3 8.5 9 8 12 2z"></path>
                                        </svg>
                                    </button>
                                ))
                            ) : (
                                <div style={{ color: "#6c757d" }}>Заданий нет</div>
                            )}
                        </div>
                    </div>

                    <div style={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '8px',
                            }}>
                        <button className="video-btn" id="startVideo" title="Видеоконференция" aria-label="Видеоконференция">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="3" y="5" width="14" height="14" rx="2"></rect>
                                <path d="M21 8l-4 3v2l4 3V8z"></path>
                            </svg>
                        </button>
                    </div>
        </div>
    );

};
export default Lesson_navbar;