import '../style_auth.css';
import React, { useEffect, useState, useCallback } from "react";
import Modal_add_subject from './Modal_add_subject';

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const Subjects = ({ onSelect }) => {
    const [showModal, setShowModal] = useState(false);
    const [subjectToEdit, setSubjectToEdit] = useState(null);
    const [subjects, setSubjects] = useState([]);
    const [deletingId, setDeletingId] = useState(null);

    const fetchSubjects = useCallback(async () => {
        const token = localStorage.getItem("access_token");
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
    }, []);

    useEffect(() => {
        fetchSubjects();
    }, [fetchSubjects]);

    const handleSubjectCreated = () => {
        fetchSubjects();
    };

    const handleSubjectUpdated = (updatedSubject) => {
        setSubjects((prev) =>
            prev.map((s) => (s.id === updatedSubject.id ? updatedSubject : s))
        );
        setSubjectToEdit(null);
    };

    const handleEditClick = (e, subject) => {
        e.stopPropagation();
        setSubjectToEdit(subject);
        setShowModal(true);
    };

    const handleDeleteClick = async (e, subject) => {
        e.stopPropagation();
        if (!window.confirm(`Удалить предмет "${subject.name}"?`)) return;

        setDeletingId(subject.id);
        try {
            const token = localStorage.getItem("access_token");
            const response = await fetch(
                `${API_URL}/subject/delete_subject/${subject.id}`,
                {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (!response.ok) {
                const errData = await response.json().catch(() => null);
                throw new Error(errData?.detail || "Не удалось удалить предмет");
            }

            setSubjects((prev) => prev.filter((s) => s.id !== subject.id));
        } catch (error) {
            console.error("Ошибка удаления предмета:", error);
            alert(error.message);
        } finally {
            setDeletingId(null);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSubjectToEdit(null);
    };

    const renderSubjects = () => {
        return subjects.map(subject => (
            <div key={subject.id} className="subject-selection-item" onClick={() => onSelect(subject)}>
                <span>{subject.name}</span>
                <div className="selection-item-actions">
                    <button className="edit-btn" onClick={(e) => handleEditClick(e, subject)}>
                        ✏️
                    </button>
                    <button
                        className="delete-btn"
                        onClick={(e) => handleDeleteClick(e, subject)}
                        disabled={deletingId === subject.id}
                    >
                        {deletingId === subject.id ? "…" : "🗑️"}
                    </button>
                </div>
            </div>
        ));
    };

    return(
            <div className="modal-subjects-list">
                <div>
                    <button className="add-subject-btn" onClick={() => setShowModal(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Добавить предмет
                        </button>
                </div>
                {showModal && <Modal_add_subject onClose={() => setShowModal(false)} onSubjectCreated={handleSubjectCreated} onSubjectUpdated={handleSubjectUpdated} subjectToEdit={subjectToEdit}/>}
                {renderSubjects()} 
            </div>

    );
};
export default Subjects;