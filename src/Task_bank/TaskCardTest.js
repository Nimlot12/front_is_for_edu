import React, { useState } from 'react';
import TestDetailsModal from './TestDetailsModal';

const TaskCardTest = ({ task }) => {
    const [showModal, setShowModal] = useState(false);
    const handleOpenDetails = () => {
        setShowModal(true);
      };
    return (
        <div className="task-card">
            <div className="task-content">
                <h3>{task.title || task.name}</h3>
                <p>Количество вопросов: {task.questions?.length || 0}</p>
            </div>
            <div className="task-actions">
                <button className="view-test-btn" title="Просмотр" onClick={handleOpenDetails}>👁️</button>
                <button className="edit-task-btn">✏️</button>
                <button className="delete-task-btn">🗑️</button>
            </div>
            {showModal && (
                <TestDetailsModal
                testId={task.id || task.test_id}
                onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
};

export default TaskCardTest;