import { useUser } from "../UserContext";
import NavBar from "../NavBar";
import Header from "../Header";
import '../style_auth.css';
import Roles_filter from "./Roles_filter";
import Roles_table from "./Roles_table";


const Roles_page = () => {
    const {user, setUser} = useUser();
    return (
        <div className="dashboard-container">
            <NavBar user={user} setUser={setUser}/>
            <main className="main-content">
                <Header user={user}/>
                <div>
                    <Roles_filter />
                    <Roles_table />
                </div>
            </main>
        </div>
    );

};
export default Roles_page;