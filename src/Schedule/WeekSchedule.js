import React, { useState, useEffect } from "react";
import FormAddLesson from "./Form_add_lesson";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";
const DAYS_OF_WEEK = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье",
];

const formatDate = (date) =>
  date.toLocaleDateString("ru-RU", { day: "numeric", month: "short" });

const WeekSchedule = ({ currentWeekStart }) => {
  const [schedule, setSchedule] = useState({});
  const [modalData, setModalData] = useState(null);

  const openAddLessonModal = (date) => {
    setModalData({
      date,
      timeStart: "",
      timeEnd: "",
      student_id: "",
      subject_id: "",
      price: "",
      comment: "",
      teacher_id: null,
    });
  };

  const closeModal = () => setModalData(null);

  const addLessonToSchedule = (lesson) => {
    const formattedLesson = {
        ...lesson,
        timeStart: new Date(lesson.timeStart).toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        timeEnd: new Date(lesson.timeEnd).toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
    setSchedule((prev) => {
      const dateKey = formattedLesson.date; // Используем дату из урока
      return {
        ...prev,
        [dateKey]: [...(prev[dateKey] || []), lesson],
      };
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    fetch(`${API_URL}/schedule/get_by_schedules_list/?page=1&limit=1000`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response.json())
      .then(async (data) => {
        const lessonsByDate = {};

        for (const lesson of data) {
          const dateKey = lesson.date.split("T")[0];

          
          const student = await fetch(`${API_URL}/auth/get_user_by_id/?id=${lesson.child_id}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }).then(res => res.json());
          const teacher = await fetch(`${API_URL}/auth/get_user_by_id/?id=${lesson.teacher_id}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }).then(res => res.json());
          const subject = await fetch(`${API_URL}/subject/get_subject_by_id/?id=${lesson.subject_id}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }).then(res => res.json());

          const formattedLesson = {
            id: lesson.id,
            timeStart: new Date(lesson.time).toLocaleTimeString("ru-RU", {
                hour: "2-digit",
                minute: "2-digit",
              }),
              timeEnd: new Date(lesson.time_end).toLocaleTimeString("ru-RU", {
                hour: "2-digit",
                minute: "2-digit",
              }),
            studentName: `${student.first_name} ${student.last_name}`,
            teacherName: `${teacher.first_name} ${teacher.last_name}`,
            subjectName: subject.name,
            price: lesson.price,
            comment: lesson.comment,
            paymentStatus: lesson.status_id === 4 ? "Оплачено" : "Не оплачено",
          };

          if (!lessonsByDate[dateKey]) {
            lessonsByDate[dateKey] = [];
          }
          lessonsByDate[dateKey].push(formattedLesson);
        }

        setSchedule(lessonsByDate);
      })
      .catch((error) => console.error("Ошибка загрузки расписания:", error));
  }, []);

  const deleteLesson = async (scheduleId) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${API_URL}/schedule/delete_schedule/${scheduleId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (!response.ok) throw new Error("Ошибка удаления");
      
      // Обновляем состояние после удаления
      setSchedule(prev => {
        const newSchedule = {...prev};
        for (const dateKey in newSchedule) {
          newSchedule[dateKey] = newSchedule[dateKey].filter(
            lesson => lesson.id !== scheduleId
          );
        }
        return newSchedule;
      });
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  return (
    <div>
      <div className="schedule-container">
        {DAYS_OF_WEEK.map((day, index) => {
          const currentDate = new Date(currentWeekStart);
          currentDate.setDate(currentDate.getDate() + index);
          const dateKey = currentDate.toISOString().split("T")[0];
          const lessons = schedule[dateKey] || [];

          const sortedLessons = lessons.sort((a, b) => {
            const timeA = new Date(`1970-01-01T${a.timeStart}`).getTime();
            const timeB = new Date(`1970-01-01T${b.timeStart}`).getTime();
            return timeA - timeB;
          });

          return (
            <div key={dateKey} className="schedule-day">
              <div className="day-header">
                <h4>{day}</h4>
                <span>{formatDate(currentDate)}</span>
                <button onClick={() => openAddLessonModal(dateKey)} className="add-day-lesson-btn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
              </div>
              <div className="day-lessons">
                {lessons.length > 0 ? (
                  sortedLessons.map((lesson, i) => (
                    <div key={i} className={`lesson-card ${lesson.paymentStatus === "Оплачено" ? "paid" : "unpaid"}`}>
                        <button className="delete-lesson-btn" onClick={() => deleteLesson(lesson.id)}>
                            ❌
                        </button>
                      <div className="lesson-time">{lesson.timeStart} - {lesson.timeEnd}</div>
                      <div className="lesson-details">
                        <div className="lesson-student">{lesson.studentName}</div>
                        <div className="lesson-subject">{lesson.subjectName}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-lessons">Нет занятий</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {modalData && <FormAddLesson modalData={modalData} closeModal={closeModal} addLessonToSchedule={addLessonToSchedule} setModalData={setModalData} schedule={schedule}/>}
    </div>
  );
  };

export default WeekSchedule;
