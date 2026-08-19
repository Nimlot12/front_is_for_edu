import React, {useState} from "react";
import RichTextEditor from "./RichTextEditor";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const Modal_add_subject = ({ onClose, onSubjectCreated }) => {
    const [title, setTitle] = useState("");
    const [description1, setDescription1] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

            const response = await fetch(`${API_URL}/subject/create_subject/`, {
                method: "POST",
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

            if (onSubjectCreated) onSubjectCreated(data);
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
                    <h3 id="subjectModalTitle">Добавить предмет</h3>
                    <form id="subjectForm" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label for="subjectName">Название предмета</label>
                            <input
                                type="text"
                                id="subjectName"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label for="subjectDescription">Описание</label>
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