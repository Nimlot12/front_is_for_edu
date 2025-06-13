import '../style_auth.css';
import React, { useEffect, useState } from "react";
import Modal_add_them from './Modal_add_them';

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const Thems = ({onSelect, subject_id}) => {
    const [showModal, setShowModal] = useState(false);
    const [themes, setThemes] = useState([]); 
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        const fetchThemes = async () => {
            try {
              const response = await fetch(`${API_URL}/themes/get_themes_by_subject/?subject_id=${subject_id}`, {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });
              if (response.ok) {
                const data = await response.json();
                setThemes(data);
              } else {
                console.error("Ошибка получения тем", response.status);
              }
            } catch (error) {
              console.error("Ошибка получения тем:", error);
            }
          };
          fetchThemes();
    }, 
    []);

    const renderThemes = () => {
        return themes.map(theme => (
            <div key={theme.id} className="subject-selection-item" onClick={() => onSelect(theme)}>
                <span>{theme.name}</span>
                <div className="selection-item-actions">
                    <button className="edit-btn">✏️</button>
                    <button className="delete-btn">🗑️</button>
                </div>
            </div>
        ));
    };

    return(
        <div className="modal-subjects-list">
                        <div >
                            <div className="topics-controls">
                                <button className="add-topic-btn" onClick={() => setShowModal(true)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                    Добавить тему
                                </button>
                            </div>
                            {showModal && <Modal_add_them onClose={() => setShowModal(false)} />}
                        </div>
                        {renderThemes()} 
                    </div>
    );
};
export default Thems;