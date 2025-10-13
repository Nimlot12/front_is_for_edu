import { useUser } from "../../UserContext";
import NavBar from "../../NavBar";
import Header from "../../Header";
import '../../style_auth.css';
import LessonHomework_filtr from "./LessonHomework_filtr";
import LessonHomework_list from "./LessonHomework_list";


const LessonHomework_page = () => {
    const {user, setUser} = useUser();
    return (
        <div className="dashboard-container">
            <NavBar user={user} setUser={setUser}/>
            <main className="main-content">
                <Header user={user}/>
                <div className="workspace-detail-container">
                    <LessonHomework_filtr />
                    <LessonHomework_list />
                </div>
            </main>
        </div>
    );

};
export default LessonHomework_page;