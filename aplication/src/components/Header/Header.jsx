import "./Header.css";
import { useNavigate } from "react-router-dom";
const Header = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("apiKey");
        localStorage.removeItem("userid");
        navigate("/");
        //window.location.reload();
    };
    return (
        <header className="header">
            <img src="/assets/img/logoHeader.png" alt="Logo" className="logo-header" />
            <h1></h1>
            <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
        </header>
    );
};

export default Header;
