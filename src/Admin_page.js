import react from "react";
import NavBar from "./NavBar";
import Header from "./Header";
import Admin_grid from "./Admin_grid";
import { useUser } from "./UserContext";


const Admin_page = () => {
    const { user, setUser } = useUser();
    return (
        <div className="dashboard-container">
            <NavBar user={user} setUser={setUser}/>
            <main className="main-content">
                <Header user={user}/>
                <Admin_grid/>
            </main>
        </div>
    );
};
export default Admin_page;