import { useUser } from "../UserContext";
import NavBar from "../NavBar";
import Header from "../Header";
import '../style_auth.css';
import Permission_filter from "./Permission_filter";
import Permission_table from "./Permission_table";


const Permission_page = () => {
    const {user, setUser} = useUser();
    return (
        <div className="dashboard-container">
            <NavBar user={user} setUser={setUser}/>
            <main className="main-content">
                <Header user={user}/>
                <div>
                    <Permission_filter />
                    <Permission_table />
                </div>
            </main>
        </div>
    );

};
export default Permission_page;