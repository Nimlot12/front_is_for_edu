import { useUser } from "../UserContext";
import NavBar from "../NavBar";
import Header from "../Header";
import '../style_auth.css';
import Users_filter from "./Users_filter";
import Users_table from "./Users_table";


const Users_page = () => {
    const {user, setUser} = useUser();
    return (
        <div className="dashboard-container">
            <NavBar user={user} setUser={setUser}/>
            <main className="main-content">
                <Header user={user}/>
                <div>
                    <Users_filter />
                    <Users_table />
                </div>
            </main>
        </div>
    );

};
export default Users_page;