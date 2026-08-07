import MessengerComponent from "./Messenger-component";

const Contacts = () => {
    return (
        <aside className="contacts">
            <header className="contacts__header">
                <button
                    id="toggleContactsBtn"
                    title="Свернуть/Развернуть контакты"
                    className="contacts__toggle"
                    aria-label="Свернуть/Развернуть"
                >
                    ☰
                </button>
                <strong className="contacts__title">Контакты</strong>
                <button
                    id="newChatBtn"
                    title="Новый чат"
                    className="contacts__new-chat"
                >
                    +
                </button>
            </header>

            <input
                className="search-input"  // Глобальный!
                id="contactSearch"
                placeholder="Поиск контактов..."
            />

            <ul className="contacts__list" id="contactsList">
                {/* Contacts rendered here */}
            </ul>
        </aside>
    );
};
export default Contacts;