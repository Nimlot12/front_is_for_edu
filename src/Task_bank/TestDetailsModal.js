import React, { useEffect, useState } from 'react';
import '../style_auth.css';

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const TestDetailsModal = ({ testId, onClose }) => {
  const [testDetails, setTestDetails] = useState(null);

  useEffect(() => {
    const fetchTestDetails = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(`${API_URL}/tests/get_by_test/?id=${testId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setTestDetails(data);
        } else {
          console.error("Ошибка при загрузке деталей теста");
        }
      } catch (error) {
        console.error("Ошибка сети:", error);
      }
    };

    fetchTestDetails();
  }, [testId]);

  if (!testDetails) {
    return <div className="modal-backdrop"><div className="modal-content">Загрузка...</div></div>;
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>✖</button>
        <h2>Тест №{testDetails.test_id}</h2>
        <div className="test-questions-container">
          {testDetails.questions.map((question, index) => (
            <div key={index} className="test-question">
              <h4>Вопрос {index + 1}: {question.question}</h4>
              <p>{question.description}</p>
              {question.type_quest === "Вопрос с полем ввода" && (
                <p><strong>Ответ:</strong> {question.answers[0]?.answer}</p>
              )}
              {question.type_quest === "Вопрос с одиночным выбором" && (
                <ul>
                  {question.answers.map((ans, i) => (
                    <li key={i} style={{ color: ans.correct ? 'green' : 'black' }}>
                      {ans.answer} {ans.correct && '✅'}
                    </li>
                  ))}
                </ul>
              )}
              {/* Пояснение можно добавить, если появится */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestDetailsModal;