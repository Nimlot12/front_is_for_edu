import React, { useEffect, useState } from "react";


const LessonHomework_filtr = () => {
    return (
        <div className="filter-panel">
                    <div className="filter-row">
                        <div className="input-group" style={{flex:1}}>
                            <label>Название блока</label>
                            <input type="text" id="filterName" placeholder="Название урока или домашней работы"/>
                        </div>
                        <div className="input-group">
                            <label>Тип</label>
                            <select id="filterType">
                                <option value="all">Все</option>
                                <option value="lesson">Урок</option>
                                <option value="homework">Домашнее задание</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label>Дата проведения от</label>
                            <input type="date" id="dateFrom"/>
                        </div>
                        <div className="input-group">
                            <label>Дата окончания до</label>
                            <input type="date" id="dateTo"/>
                        </div>
                        <div className="input-group">
                            <label>Сортировка по оценке</label>
                            <select id="sortGrade">
                                <option value="none">Не сортировать</option>
                                <option value="asc">По возрастанию</option>
                                <option value="desc">По убыванию</option>
                            </select>
                        </div>
                        <div className="input-group" style={{alignSelf: 'flex-end'}}>
                            <button className="submit-btn" id="applyFilters">Применить</button>
                        </div>
                    </div>
                </div>
    );

};
export default LessonHomework_filtr;