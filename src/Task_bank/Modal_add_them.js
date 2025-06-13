import React, {useState} from "react";
import RichTextEditor from "./RichTextEditor";
const Modal_add_them = ({onClose}) => {
    const [title, setTitle] = useState("");
    const [description1, setDescription1] = useState("");
    return(
        <div className="modal" id="topicModal">
                <div className="modal-content">
                    <span className="close-modal" onClick={onClose}>&times;</span>
                    <h3 id="topicModalTitle">Добавить тему</h3>
                    <form id="topicForm">
                        <div className="input-group">
                            <label for="topicName">Название темы</label>
                            <input type="text" id="topicName" required/>
                        </div>
                        <div className="input-group">
                            <label for="topicDescription">Описание (необязательно)</label>
                            <RichTextEditor content={description1} setContent={setDescription1}/>
                        </div>
                        <button type="submit" className="submit-btn">Сохранить</button>
                    </form>
                </div>
            </div>
    );
};
export default Modal_add_them;