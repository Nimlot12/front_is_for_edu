import React from "react";
import Subjects from "./Subjects";
const Modal_select_subject = ({ onClose, onSelect }) => {
    return(
        <div className="modal" id="subjectSelectionModal">
                <div className="modal-content">
                    <span className="close-modal" onClick={onClose}>&times;</span>
                    <h3>Выбор предмета</h3>
                    <div id="subjectsSelectionList"><Subjects onSelect={(subject) => {
                                                                onSelect(subject);
                                                                onClose();}} 
                                                    />
                    </div>
                </div>
            </div>
    );
};
export default Modal_select_subject;