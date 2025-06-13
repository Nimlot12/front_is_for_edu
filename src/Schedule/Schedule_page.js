import { useUser } from "../UserContext";
import NavBar from "../NavBar";
import Header from "../Header";
import '../style_auth.css';
import Schedule_component from "./Schedule_component";


const Schedule_page = () => {
    const {user, setUser} = useUser();
    return (
        <div className="dashboard-container">
            <NavBar user={user} setUser={setUser}/>
            <main className="main-content">
                <Header user={user}/>
                <div>
                    <Schedule_component />
                </div>
            </main>
        </div>
    );

};
export default Schedule_page;