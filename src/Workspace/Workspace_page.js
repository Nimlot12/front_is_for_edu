import { useUser } from "../UserContext";
import NavBar from "../NavBar";
import Header from "../Header";
import '../style_auth.css';
import Workspace_component from "./Workspace_component";


const Workspace_page = () => {
    const {user, setUser} = useUser();
    return (
        <div className="dashboard-container">
            <NavBar user={user} setUser={setUser}/>
            <main className="main-content">
                <Header user={user}/>
                <div className="workspaces-container">
                    <Workspace_component />
                </div>
            </main>
        </div>
    );

};
export default Workspace_page;