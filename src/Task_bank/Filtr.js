import '../style_auth.css';
import React, { useEffect, useState } from "react";
import Modal_add_task from "./Modal_add_task";
import Modal_select_subject from './Modal_select_subject';
import Modal_select_them from './Modal_select_them';
const Filtr = ({ onThemeSelect }) => {
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedTheme, setSelectedTheme] = useState(null);
    const [selectedTaskType, setSelectedTaskType] = useState('');

    const taskTypes = [
        { value: 'test', label: 'Тест' },
        { value: 'open', label: 'Текстовая задача' },
        { value: 'matching', label: 'Задача с медиа контентом' },
    ];

    useEffect(() => {
        if (selectedTheme && selectedTaskType) {
          onThemeSelect({ theme: selectedTheme, taskType: selectedTaskType });
        }
      }, [selectedTaskType]);

    const handleThemeSelect = (theme) => {
        setSelectedTheme(theme);
      };

    const handleClearTheme = () => {
    setSelectedTheme(null);
    setSelectedTaskType('');
    onThemeSelect({ theme: null, taskType: '' }); 
    };

    return (
        <div className="task-filter-section">
                    <div className="filter-parameters">
                        <div className="filter-item subject-filter">
                            <button className="filter-btn" onClick={() => setShowModal2(true)}>Предмет</button>
                            <div className="selected-filters" id="selectedSubjects">
                                {selectedSubject && (
                                    <div className="selected-filter-item">
                                    {selectedSubject.name}
                                    <span className="remove-filter" onClick={() => setSelectedSubject(null)}>&times;</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="filter-item topic-filter">
                            <button className="filter-btn" onClick={() => setShowModal3(true) } disabled={!selectedSubject}>Тема</button>
                            <div className="selected-filters" id="selectedTopics">
                                {selectedTheme && (
                                    <div className="selected-filter-item">
                                    {selectedTheme.name}
                                    <span className="remove-filter" onClick={handleClearTheme}>&times;</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div >
                            <div className="input-group">
                            <select
                                value={selectedTaskType}
                                onChange={(e) => setSelectedTaskType(e.target.value)}
                                disabled={!selectedTheme}
                                >
                                <option value="">Выберите тип задачи</option>
                                {taskTypes.map((type) => (
                                    <option key={type.value} value={type.value}>
                                    {type.label}
                                    </option>
                                ))}
                                </select>
                            </div>
                        </div>
                        <button className="filter-btn" onClick={() => setShowModal(true)} disabled={!selectedTheme}>+ Добавить задачу</button>
                        {showModal && <Modal_add_task onClose={() => setShowModal(false)} />}
                        {showModal2 && <Modal_select_subject onClose={() => setShowModal2(false)} onSelect={setSelectedSubject}/>}
                        {showModal3 && <Modal_select_them onClose={() => setShowModal3(false)} onSelect={handleThemeSelect} subject_id={selectedSubject?.id}/>}
                    </div>
                </div>
    );
};
export default Filtr;