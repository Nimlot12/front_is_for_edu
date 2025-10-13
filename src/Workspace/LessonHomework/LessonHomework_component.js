import React, { useEffect, useState } from "react";
import LessonHomework_filtr from "./LessonHomework_filtr";
import LessonHomework_list from "./LessonHomework_list";


const LessonHomework_component = () => {
    return (
        <div>
            <LessonHomework_filtr />
            <LessonHomework_list />
        </div>
    );

};
export default LessonHomework_component;