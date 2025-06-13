import React, {useState} from "react";
import RichTextEditor from "./RichTextEditor";
const Modal_add_subject = ({ onClose }) => {
    const [title, setTitle] = useState("");
    const [description1, setDescription1] = useState("");
    return(
        <div className="modal" id="subjectModal">
                <div className="modal-content">
                    <span className="close-modal" onClick={onClose}>&times;</span>
                    <h3 id="subjectModalTitle">Добавить предмет</h3>
                    <form id="subjectForm">
                        <div className="input-group">
                            <label for="subjectName">Название предмета</label>
                            <input type="text" id="subjectName" required/>
                        </div>
                        <div className="input-group">
                            <label for="subjectDescription">Описание</label>
                            <RichTextEditor content={description1} setContent={setDescription1}/>
                        </div>
                        <button type="submit" className="submit-btn">Сохранить</button>
                    </form>
                </div>
            </div>
    );
};
export default Modal_add_subject;