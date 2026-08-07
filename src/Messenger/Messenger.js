import NavBar from "../NavBar";
import Header from "../Header";
import '../styles/messenger.scss';
import { useUser } from "../UserContext";
import MessengerComponent from "./Messenger-component";
import Contacts from "./Contacts";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const Messenger = () => {
    const { user, setUser } = useUser();
    return(
        <div className="dashboard">
            <NavBar user={user} setUser={setUser}/>
            <main className="dashboard__content">
                <Header user={user}/>
                <div className="messenger">
                    <Contacts />
                    <MessengerComponent />
                </div>
            </main>
        </div>
    );
};
export default Messenger;