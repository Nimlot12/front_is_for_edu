

const MessengerComponent = () => {
    return(
        <div className="chat">
            <header className="chat__header-row">
                <div className="chat__header" id="chatHeader">Выберите контакт</div>
                <div className="chat__controls">
                    <button id="bgToggleBtn" className="chat__bg-toggle" title="Сменить фон">
                        🎨
                    </button>
                </div>
            </header>

            <div className="chat__messages chat-bg-default" id="chatMessages">
                <div className="chat__empty-hint">Откройте чат, чтобы начать общение</div>
            </div>

            <footer className="chat__input-row">
                <button id="stickerBtn" className="chat__sticker-btn" title="Стикеры">
                    😊
                </button>
                <input type="text" id="messageInput" className="chat__input" placeholder="Введите сообщение..."/>
                <button id="sendBtn" className="btn btn--primary">Отправить</button>  {/* Глобальная кнопка! */}
            </footer>

             {/*Sticker picker modal */}
            {/*<div className="modal" id="stickerModal">*/}
            {/*    <div className="modal__content">*/}
            {/*        <span className="modal__close" id="closeStickerModal">&times;</span>*/}
            {/*        <h3 className="modal__title">Стикеры</h3>*/}
            {/*        <div id="stickerGrid" className="sticker-grid">*/}
            {/*            <button className="sticker-item">😀</button>*/}
            {/*            /!* ... стикеры *!/*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/* /!*Background selector modal *!/*/}
            {/*<div className="modal" id="bgModal">*/}
            {/*    <div className="modal__content">*/}
            {/*        <span className="modal__close" id="closeBgModal">&times;</span>*/}
            {/*        <h3 className="modal__title">Фон чата</h3>*/}
            {/*        <div className="bg-options">*/}
            {/*            <button className="bg-option" data-bg="chat-bg-default">Default</button>*/}
            {/*            /!* ... остальные *!/*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
};
export default MessengerComponent;