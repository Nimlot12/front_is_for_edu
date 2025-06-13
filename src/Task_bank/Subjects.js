import '../style_auth.css';
import React, { useEffect, useState } from "react";
import Modal_add_subject from './Modal_add_subject';
const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const Subjects = ({ onSelect }) => {
    const [showModal, setShowModal] = useState(false);
    const [subjects, setSubjects] = useState([]); 
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        const fetchSubjects = async () => {
            try {
              const response = await fetch(`${API_URL}/subject/get_by_subjects_list/`, {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });
              if (response.ok) {
                const data = await response.json();
                setSubjects(data);
              } else {
                console.error("Ошибка получения предметов", response.status);
              }
            } catch (error) {
              console.error("Ошибка получения предметов:", error);
            }
          };
          fetchSubjects();
    }, 
    []);

    const renderSubjects = () => {
        return subjects.map(subject => (
            <div key={subject.id} className="subject-selection-item" onClick={() => onSelect(subject)}>
                <span>{subject.name}</span>
                <div class="selection-item-actions">
                    <button className="edit-btn">✏️</button>
                    <button className="delete-btn">🗑️</button>
                </div>
            </div>
        ));
    };

    return(
            <div className="modal-subjects-list">
                <div>
                    <button className="add-subject-btn" onClick={() => setShowModal(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Добавить предмет
                        </button>
                </div>
                {showModal && <Modal_add_subject onClose={() => setShowModal(false)} />}
                {renderSubjects()} 
            </div>

    );
};
export default Subjects;