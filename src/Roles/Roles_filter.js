const Roles_filter = () => {
    return(
        <div className="users-filter">
            <div className="filter-group">
                <input type="text" id="nameFilter" placeholder="Роль"/>
                <button id="applyFilters" className="filter-btn">Применить</button>
                <button id="clearFilters" className="filter-btn">Очистить</button>
            </div>
        </div>
    );
};
export default Roles_filter;
