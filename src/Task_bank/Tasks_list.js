import '../style_auth.css';
import React, { useEffect, useState } from "react";
import TaskCardText from './TaskCardText';
import TaskCardTest from './TaskCardTest';
import TaskCardMedia from './TaskCardMedia';

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const Tasks_list = ({ selectedTheme, selectedTaskType }) => {
    const [tasks, setTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 4;
    useEffect(() => {
        const fetchTasks = async () => {
            if (!selectedTheme || !selectedTaskType) {
                setTasks([]);  
                return;
              };
    
          const token = localStorage.getItem("access_token");
    
          let url = '';
          if (selectedTaskType === 'open') {
            url = `${API_URL}/text_task/get_text_tasks_by_theme_id/?theme_id=${selectedTheme.id}&page=${currentPage}&limit=${pageSize}`;
          } else if (selectedTaskType === 'test') {
            url = `${API_URL}/tests/get_by_tests_list/`;
          } else if (selectedTaskType === 'matching') {
            url = `${API_URL}/media_task/get_media_tasks_by_theme_id/?theme_id=${selectedTheme.id}&page=${currentPage}&limit=${pageSize}`;
          }
    
          try {
            const response = await fetch(url, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
    
            if (response.ok) {
              const data = await response.json();
              setTasks(data);
            } else {
              console.error("Ошибка получения задач", response.status);
            }
          } catch (error) {
            console.error("Ошибка:", error);
          }
        };
    
        fetchTasks();
      }, [selectedTheme, selectedTaskType, currentPage]);

      const renderTasks = () => {
        if (!selectedTheme) {
            return <p className="no-tasks-message">Выберите предмет и тему для отображения задач</p>;
        }
    
        if (tasks.length === 0) {
            return <p className="no-tasks-message">Нет задач для выбранной темы</p>;
        }

        return tasks.map((task) => {
            if (selectedTaskType === 'open') {
                return <TaskCardText key={task.id} task={task} />;
            } else if (selectedTaskType === 'test') {
                return <TaskCardTest key={task.id} task={task} />;
            } else if (selectedTaskType === 'matching') {
                return <TaskCardMedia key={task.id} task={task} />;
            }
            return null;
        });
    };
    return (
        <div className="tasks-list-container" id="tasksList">
            <div className="tasks-list">{renderTasks()}</div>
            <div className="pagination">
                <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>Предыдущая</button>
                <span>{currentPage}</span>
                <button
                    onClick={() => {
                        if (tasks.length === pageSize) {
                            setCurrentPage(prev => prev + 1);
                        }
                    }}
                    disabled={tasks.length < pageSize}
                >
                    Следующая
                </button>
            </div>
        </div>
    );
};
export default Tasks_list;