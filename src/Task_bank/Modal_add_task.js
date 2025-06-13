import React, { useState } from "react";
import RichTextEditor from "./RichTextEditor";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";


const Modal_add_task = ({onClose}) => {
    const [title, setTitle] = useState("");
    const [description1, setDescription1] = useState("");
    const [description2, setDescription2] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const token = localStorage.getItem("access_token");
            const response = await fetch(`${API_URL}/text_task/create_text_task/`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: title,
                    discription: description1, 
                    theme_id: 1,
                }),
              });
        //   const response = await axios.post(
        //     "http://localhost:8000/text_task/create_text_task/",
        //     {
        //       name: title,
        //       discription: description1, 
        //     },
        //     {
        //       headers: {
        //         Authorization: `Bearer ${localStorage.getItem("access_token")}`, 
        //       },
        //     }
        //   );
          console.log("Задача создана", response.data);
          onClose(); 
        } catch (error) {
          console.error("Ошибка при создании задачи", error);
        }
      };
    return(
        <div className="modal" id="taskModal">
                <div className="modal-content">
                    <span className="close-modal" onClick={onClose}>&times;</span>
                    <h3 id="taskModalTitle">Добавить задачу</h3>
                    <form id="taskForm" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label for="taskTitle">Название задачи</label>
                            <input type="text" id="taskTitle" required value={title} onChange={(e) => setTitle(e.target.value)}/>
                        </div>
                        <div className="input-group">
                            <label for="typeTask">Тип задачи</label>
                            <select id="typeTask" required>
                                <option value="">Выберите тип задания</option>
                                <option value="Задача 1">Задача 1</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label for="taskDifficulty">Сложность</label>
                            <select id="taskDifficulty">
                                <option value="easy">Легко</option>
                                <option value="medium">Средне</option>
                                <option value="hard">Сложно</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label for="taskDescription">Описание задачи</label>
                            <RichTextEditor content={description1} setContent={setDescription1} />
                        </div>
                        {/* <div className="input-group">
                            <label for="taskAnswer">Решение</label>
                            <RichTextEditor content={description2} setContent={setDescription2} />
                        </div> */}
                        <button type="submit" className="submit-btn">Сохранить</button>
                    </form>
                </div>
            </div>
    );
};
export default Modal_add_task;