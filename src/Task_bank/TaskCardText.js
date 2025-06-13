import React from 'react';

const getDifficultyLabel = (difficulty) => {
    switch (difficulty) {
        case "easy": return "Легко";
        case "medium": return "Средне";
        case "hard": return "Сложно";
        default: return difficulty;
    }
};

const TaskCardText = ({ task }) => {
    return (
        <div className="task-card">
            <div className="task-content">
                <h3>{task.name}</h3>
                <p dangerouslySetInnerHTML={{ __html: task.discription }}></p>
            </div>
            <span className={`task-difficulty ${task.difficulty}`}>
                {getDifficultyLabel(task.difficulty)}
            </span>
            <div className="task-actions">
                <button className="edit-task-btn">✏️</button>
                <button className="delete-task-btn">🗑️</button>
            </div>
        </div>
    );
};

export default TaskCardText;