import { useUser } from "../../UserContext";
import NavBar from "../../NavBar";
import Header from "../../Header";
import '../../style_auth.css';
import Lesson_navbar from "./Lesson_navbar";
import React from "react";
import { useParams } from "react-router-dom";
import JamBoard from "./JamBoard";

const Lesson_page = () => {
    const {user, setUser} = useUser();
    const { lessonId } = useParams();
    return (
        <div className="dashboard-container">
            <NavBar user={user} setUser={setUser}/>
            <main className="main-content">
                <Header user={user}/>
                <div className="lesson-container">
                    <Lesson_navbar lessonId={lessonId}/>
                    <JamBoard />
                </div>
            </main>
        </div>
    );

};
export default Lesson_page;