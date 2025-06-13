import Thems from "./Thems";
import '../style_auth.css';
import React, { useEffect, useState } from "react";
import Modal_add_task from "./Modal_add_task";
const Tasks = () => {
    const [showModal, setShowModal] = useState(false);
    return (
        <div class="tasks-section" id="tasksSection">
            <Thems/>
             <div class="section-header">
                        <h2>Задачи</h2>
                        <button class="add-task-btn" onClick={() => setShowModal(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                            Добавить задачу</button>
                </div>
                    {showModal && <Modal_add_task onClose={() => setShowModal(false)} />}
                    
                    <div class="tasks-grid" id="tasksGrid">
                        <p class="no-subject-selected">Выберите предмет для просмотра задач</p>
                    </div>
                    
                <div class="task-filter">
                        
                </div>
        </div>
    );
};
export default Tasks;