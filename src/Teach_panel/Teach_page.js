import { useUser } from "../UserContext";
import NavBar from "../NavBar";
import Header from "../Header";
import '../style_auth.css';
import Teach_menu from "./Teach_menu";


const Teach_page = () => {
    const {user, setUser} = useUser();
    return (
        <div className="dashboard-container">
            <NavBar user={user} setUser={setUser}/>
            <main className="main-content">
                <Header user={user}/>
                <div>
                    <Teach_menu />
                </div>
            </main>
        </div>
    );

};
export default Teach_page;