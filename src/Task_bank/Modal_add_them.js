import React, {useState, useEffect} from "react";
import RichTextEditor from "./RichTextEditor";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const Modal_add_them = ({onClose, onThemeCreated, onThemeUpdated, themeToEdit, subject_id}) => {
    const isEditMode = Boolean(themeToEdit);

    const [title, setTitle] = useState("");
    const [description1, setDescription1] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setTitle(themeToEdit?.name || "");
        setDescription1(themeToEdit?.description || "");
    }, [themeToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!title.trim()) {
            setError("Введите название темы");
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem("access_token");
            const url = isEditMode
                ? `${API_URL}/themes/update_theme/${themeToEdit.id}`
                : `${API_URL}/themes/create_theme/`;
            const method = isEditMode ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: title,
                    description: description1,
                    subject_id: isEditMode ? themeToEdit.subject_id : subject_id,
                }),
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => null);
                throw new Error(errData?.detail || "Не удалось сохранить тему");
            }

            const data = await response.json();

            if (isEditMode) {
                if (onThemeUpdated) onThemeUpdated(data);
            } else {
                if (onThemeCreated) onThemeCreated(data);
            }
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className="modal" id="topicModal">
                <div className="modal-content">
                    <span className="close-modal" onClick={onClose}>&times;</span>
                    <h3 id="topicModalTitle">
                        {isEditMode ? "Редактировать тему" : "Добавить тему"}
                    </h3>
                    <form id="topicForm" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="topicName">Название темы</label>
                            <input
                                type="text"
                                id="topicName"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="topicDescription">Описание (необязательно)</label>
                            <RichTextEditor content={description1} setContent={setDescription1}/>
                        </div>

                        {error && <p className="form-error">{error}</p>}

                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? "Сохранение..." : "Сохранить"}
                        </button>
                    </form>
                </div>
            </div>
    );
};
export default Modal_add_them;