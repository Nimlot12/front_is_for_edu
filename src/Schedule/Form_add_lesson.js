import React from "react";
import { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const FormAddLesson = ({ modalData, closeModal, setModalData, addLessonToSchedule, schedule }) => { 
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const openAddLessonModal = (date) => {
    setModalData({
      date: "", 
      timeStart: "", 
      timeEnd: "",
      student_id: "",
      subject_id: "",
      price: "",
      comment: "",
      teacher_id: null, // Будет заполняться из API
    });
 };
//  const hasTimeConflict = (newLesson, existingLessons) => {
//     const newStart = new Date(`1970-01-01T${newLesson.timeStart}:00Z`).getTime();
//     const newEnd = new Date(`1970-01-01T${newLesson.timeEnd}:00Z`).getTime();
  
//     return existingLessons.some((lesson) => {
//       const lessonStart = new Date(`1970-01-01T${lesson.timeStart}:00Z`).getTime();
//       const lessonEnd = new Date(`1970-01-01T${lesson.timeEnd}:00Z`).getTime();
//       return newStart < lessonEnd && newEnd > lessonStart;
//     });
//   };
  useEffect(() => {
    const fetchSubjects = async () => {
        const token = localStorage.getItem("access_token");
        if (!token) return;
    
        try {
          const response = await fetch(`${API_URL}/subject/get_by_subjects_list/`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await response.json();
          setSubjects(data);
        } catch (error) {
          console.error("Ошибка загрузки предметов:", error);
        }
      };

    const fetchStudents = async () => {
        const token = localStorage.getItem("access_token");
        if (!token) return;
    
        try {
          const response = await fetch(`${API_URL}/auth/get_users_list/`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await response.json();
          setStudents(data);
        } catch (error) {
          console.error("Ошибка загрузки учеников:", error);
        }
      };
    const fetchUserData = async () => {
        const token = localStorage.getItem("access_token");
        if (!token) return;
    
        try {
          const response = await fetch(`${API_URL}/auth/me/`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          });
          const userData = await response.json();
    
          console.log("Полученный userData:", userData);
    
          setModalData(prev => ({ ...prev, teacher_id: userData.user_id }));
        } catch (error) {
          console.error("Ошибка загрузки данных учителя:", error);
        }
      };
    
    fetchUserData();
    fetchSubjects();
    fetchStudents();
  }, []);
  useEffect(() => {
    if (!modalData.date) {
      const today = new Date().toISOString().split("T")[0];
      setModalData(prev => ({ ...prev, date: today }));
    }
  }, [modalData.date]);

  const formatTimestamp = (date, time) => {
    return `${date} ${time}:00`;
  };


  const onSubmitLesson = async (e) => {
    e.preventDefault();
  
    const lessonData = {
      time: formatTimestamp(modalData.date, modalData.timeStart),
      time_end: formatTimestamp(modalData.date, modalData.timeEnd),
      date: `${modalData.date} 00:00:00`,  // Дата без времени
      price: Number(modalData.price),  // Преобразуем в число
      child_id: modalData.student_id,  // Соответствие API
      teacher_id: modalData.teacher_id,  // Должно быть заполнено заранее
      subject_id: modalData.subject_id, 
      status_id: 1, // "предстоит"
      comment: modalData.comment || "",
    };
    console.log("Отправляемые данные:", lessonData);

    // const newLesson = {
    //     timeStart: modalData.timeStart,
    //     timeEnd: modalData.timeEnd,
    //     teacher_id: modalData.teacher_id,
    //     student_id: modalData.student_id,
    //   };
    
    //   // Получаем существующие занятия для преподавателя и ученика
    //   const existingLessons = Object.values(schedule).flat();
    
    //   // Проверяем пересечение времени
    //   if (hasTimeConflict(newLesson, existingLessons)) {
    //     alert("Ошибка: Занятие пересекается с другим занятием.");
    //     return;
    //   }
  
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return;
  
      const response = await fetch(`${API_URL}/schedule/create_schedule/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(lessonData),
      });
  
      if (!response.ok) {
        throw new Error("Ошибка при создании занятия");
      }

    const createdLesson = await response.json(); // Получаем созданное занятие

    const student = await fetch(`${API_URL}/auth/get_user_by_id/?id=${createdLesson.child_id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }).then(res => res.json());
  
      const teacher = await fetch(`${API_URL}/auth/get_user_by_id/?id=${createdLesson.teacher_id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }).then(res => res.json());
  
      const subject = await fetch(`${API_URL}/subject/get_subject_by_id/?id=${createdLesson.subject_id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }).then(res => res.json());
  
      // Форматируем данные как в useEffect
      const formattedLesson = {
        date: new Date(createdLesson.time).toISOString().split('T')[0],
        timeStart: new Date(createdLesson.time).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
        timeEnd: new Date(createdLesson.time_end).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
        studentName: `${student.first_name} ${student.last_name}`,
        teacherName: `${teacher.first_name} ${teacher.last_name}`,
        subjectName: subject.name,
        price: createdLesson.price,
        comment: createdLesson.comment,
        paymentStatus: createdLesson.status_id === 4 ? "Оплачено" : "Не оплачено",
      };
      console.log(formattedLesson);
      // Добавляем в расписание
      addLessonToSchedule(formattedLesson);
  
      closeModal();
    } catch (error) {
      console.error("Ошибка:", error);
    }
};
  if (!modalData) return null;


  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-modal" onClick={closeModal}>&times;</span>
        <h2>Добавить занятие</h2>
        <form onSubmit={onSubmitLesson}>
          <input type="hidden" value={modalData.date} readOnly />

          <div className="input-group">
            <label htmlFor="dayLessonTime">Время начала занятия</label>
            <input 
              type="time" 
              id="lessonStartTime" 
              required 
              value={modalData.timeStart || ""} 
              onChange={(e) => setModalData({ ...modalData, timeStart: e.target.value })} 
            />
          </div>
          <div className="input-group">
            <label htmlFor="dayLessonTime">Время конца занятия</label>
            <input 
              type="time" 
              id="lessonEndTime" 
              required 
              value={modalData.timeEnd || ""} 
              onChange={(e) => setModalData({ ...modalData, timeEnd: e.target.value })} 
            />
          </div>

          <div className="input-group">
            <label htmlFor="dayLessonStudent">Ученик</label>
            <select
              id="dayLessonStudent"
              required
              value={modalData.student_id}
              onChange={(e) => setModalData({ ...modalData, student_id: e.target.value })}
            >
              <option value="">Выберите ученика</option>
              {students.map(student => (
                <option key={student.id} value={student.id}>
                  {student.first_name}
                </option>
              ))}
            </select>
          </div>


          <div className="input-group">
            <label htmlFor="dayLessonSubject">Предмет</label>
            <select
              id="dayLessonSubject"
              required
              value={modalData.subject_id}
              onChange={(e) => setModalData({ ...modalData, subject_id: e.target.value })}
            >
              <option value="">Выберите предмет</option>
              {subjects.map(subject => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="dayLessonSubject">Цена</label>
            <input 
              type="number" 
              id="lessonPrice" 
              required 
              value={modalData.price || ""} 
              onChange={(e) => setModalData({ ...modalData, price: e.target.value })} 
            />
          </div>
          <div className="input-group">
            <label htmlFor="lessonComment">Комментарий</label>
            <textarea
                id="lessonComment"
                value={modalData.comment || ""}
                onChange={(e) => setModalData({ ...modalData, comment: e.target.value })}
            />
          </div>


          <button type="submit" className="submit-btn">Добавить</button>
        </form>
      </div>
    </div>
  );
};

export default FormAddLesson;
