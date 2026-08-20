import '../style_auth.css';
import React, {useCallback, useEffect, useState} from "react";
import Modal_add_them from './Modal_add_them';

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const Thems = ({onSelect, subject_id}) => {
    const [showModal, setShowModal] = useState(false);
    const [themeToEdit, setThemeToEdit] = useState(null);
    const [themes, setThemes] = useState([]);
    const [deletingId, setDeletingId] = useState(null);

    const fetchThemes = useCallback(async () => {
        const token = localStorage.getItem("access_token");
        try {
            const response = await fetch(
                `${API_URL}/themes/get_themes_by_subject/?subject_id=${subject_id}`,
                {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            if (response.ok) {
                const data = await response.json();
                setThemes(data);
            } else {
                console.error("Ошибка получения тем", response.status);
            }
        } catch (error) {
            console.error("Ошибка получения тем:", error);
        }
    }, [subject_id]);

    useEffect(() => {
        if (subject_id) fetchThemes();
    }, [subject_id, fetchThemes]);

    const handleThemeCreated = (newTheme) => {
        setThemes((prev) => [...prev, newTheme]);
    };

    const handleThemeUpdated = (updatedTheme) => {
        setThemes((prev) =>
            prev.map((t) => (t.id === updatedTheme.id ? updatedTheme : t))
        );
        setThemeToEdit(null);
    };

    const handleEditClick = (e, theme) => {
        e.stopPropagation();
        setThemeToEdit(theme);
        setShowModal(true);
    };

    const handleDeleteClick = async (e, theme) => {
        e.stopPropagation();
        if (!window.confirm(`Удалить тему "${theme.name}"?`)) return;

        setDeletingId(theme.id);
        try {
            const token = localStorage.getItem("access_token");
            const response = await fetch(
                `${API_URL}/themes/delete_theme/${theme.id}`,
                {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (!response.ok) {
                const errData = await response.json().catch(() => null);
                throw new Error(errData?.detail || "Не удалось удалить тему");
            }

            setThemes((prev) => prev.filter((t) => t.id !== theme.id));
        } catch (error) {
            console.error("Ошибка удаления темы:", error);
            alert(error.message);
        } finally {
            setDeletingId(null);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setThemeToEdit(null);
    };

    const renderThemes = () => {
        return themes.map(theme => (
            <div key={theme.id} className="subject-selection-item" onClick={() => onSelect(theme)}>
                <span>{theme.name}</span>
                <div className="selection-item-actions">
                    <button className="edit-btn" onClick={(e) => handleEditClick(e, theme)}>
                        ✏️
                    </button>
                    <button
                        className="delete-btn"
                        onClick={(e) => handleDeleteClick(e, theme)}
                        disabled={deletingId === theme.id}
                    >
                        {deletingId === theme.id ? "…" : "🗑️"}
                    </button>
                </div>
            </div>
        ));
    };

    return(
        <div className="modal-subjects-list">
                        <div >
                            <div className="topics-controls">
                                <button className="add-topic-btn" onClick={() => setShowModal(true)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                    Добавить тему
                                </button>
                            </div>
                            {showModal && (
                                <Modal_add_them
                                    onClose={handleCloseModal}
                                    onThemeCreated={handleThemeCreated}
                                    onThemeUpdated={handleThemeUpdated}
                                    themeToEdit={themeToEdit}
                                    subject_id={subject_id}
                                />
                            )}
                        </div>
                        {renderThemes()} 
                    </div>
    );
};
export default Thems;