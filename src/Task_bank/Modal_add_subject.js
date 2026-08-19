import React, {useEffect, useState} from "react";
import RichTextEditor from "./RichTextEditor";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const Modal_add_subject = ({ onClose, onSubjectCreated, onSubjectUpdated, subjectToEdit }) => {
    const isEditMode = Boolean(subjectToEdit);
    const [title, setTitle] = useState(subjectToEdit?.name || "");
    const [description1, setDescription1] = useState(subjectToEdit?.description || "");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setTitle(subjectToEdit?.name || "");
        setDescription1(subjectToEdit?.description || "");
    }, [subjectToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!title.trim()) {
            setError("Введите название предмета");
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem("access_token");
            const url = isEditMode
                ? `${API_URL}/subject/update_subject/${subjectToEdit.id}`
                : `${API_URL}/subject/create_subject/`;
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
                }),
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => null);
                throw new Error(errData?.detail || "Не удалось создать предмет");
            }

            const data = await response.json();

            if (isEditMode) {
                if (onSubjectUpdated) onSubjectUpdated(data);
            } else {
                if (onSubjectCreated) onSubjectCreated(data);
            }
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className="modal" id="subjectModal">
                <div className="modal-content">
                    <span className="close-modal" onClick={onClose}>&times;</span>
                    <h3 id="subjectModalTitle">
                        {isEditMode ? "Редактировать предмет" : "Добавить предмет"}
                    </h3>
                    <form id="subjectForm" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="subjectName">Название предмета</label>
                            <input
                                type="text"
                                id="subjectName"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="subjectDescription">Описание</label>
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
export default Modal_add_subject;