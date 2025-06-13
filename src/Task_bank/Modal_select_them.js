import React from "react";
import Thems from "./Thems"
const Modal_select_them = ({ onClose, onSelect, subject_id }) => {
    return(
        <div className="modal" id="topicSelectionModal">
                <div className="modal-content">
                    <span className="close-modal" onClick={onClose}>&times;</span>
                    <h3>Выбор темы</h3>
                    <div className="modal-topics-list" id="topicsSelectionList">
                        <Thems onSelect={(theme) => {
                                                                onSelect(theme);
                                                                onClose();}} 
                                subject_id={subject_id}
                                                    />
                    </div>
                </div>
            </div>
    );
};
export default Modal_select_them;