import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const LessonHomework_list = () => {
    const { workspaceId } = useParams();
    const [lessons, setLessons] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const token = localStorage.getItem("access_token");
        fetch(`http://localhost:8000/lesson/get_lessons_by_workspace/${workspaceId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        })
        .then((res) => {
            if (!res.ok) throw new Error("Ошибка при загрузке уроков");
            return res.json();
        })
        .then((data) => {
            setLessons(data);
            setLoading(false);
        })
        .catch((err) => {
            console.error("Ошибка:", err);
            setLoading(false);
        });
    }, [workspaceId]);

  if (loading) {
    return <p>Загрузка уроков...</p>;
  }

  const getGradeClass = (score) => {
        const gradeVal = Number(score) || 0;
        if (gradeVal >= 8.7) return 'grade-high';
        if (gradeVal >= 7.0) return 'grade-mid';
        if (gradeVal >= 5.0) return 'grade-lowmid';
        return 'grade-low';
    };

    return (
        <div className="blocks-list">
            {lessons.length === 0 ? (
            <p>Пока нет уроков для этой рабочей области.</p>
        ) : (
            lessons.map((lesson) => {
                const gradeClass = getGradeClass(lesson.total_score);
                return (
                <NavLink to={`/lead_page/teach_panel/workspaces/lesson_homework/${workspaceId}/lesson/${lesson.id}`} key={lesson.id} style={{
                                                                                            all: 'unset',       
                                                                                            display: 'block',  
                                                                                        }}>
                    <div className="block-card">                                                                       
                        <div className="block-meta">
                            <div className="block-type lesson">Урок</div>
                            <div className={`block-grade ${gradeClass}`}>{lesson.total_score}</div>
                        </div>
                        <div className="block-title">{lesson.name}</div>
                        <div className="block-desc">{lesson.description}</div>
                        <div className="block-dates">
                            <div>Дата проведения: {new Date(lesson.date_start).toLocaleDateString()}</div>
                            <div>Дедлайн: {new Date(lesson.deadline).toLocaleDateString()}</div>
                        </div>
                    </div>
                </NavLink>
            );
            })
        )}
        </div>
    );

};
export default LessonHomework_list;