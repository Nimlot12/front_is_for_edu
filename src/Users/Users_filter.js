const Users_filter = () => {
    return(
        <div className="users-filter">
            <div className="filter-group">
                <input type="text" id="nameFilter" placeholder="Имя / Фамилия"/>
                <input type="text" id="emailFilter" placeholder="Электронная почта"/>
                <input type="text" id="phoneFilter" placeholder="Номер телефона"/>
                <select id="roleFilter">
                    <option value="">Все роли</option>
                    <option value="Администратор">Администратор</option>
                    <option value="Репетитор">Репетитор</option>
                    <option value="Ученик">Ученик</option>
                </select>
                <button id="applyFilters" className="filter-btn">Применить</button>
                <button id="clearFilters" className="filter-btn">Очистить</button>
            </div>
        </div>
    );
};
export default Users_filter;
