import "./Header.css";
const Header = () => {
    return (
        <header className="header">
            <img src="../img/logoHeader.png" alt="Logo" className="logo-header" />
            <h1>Mi Aplicación</h1>
            <button className="logout-button">Cerrar sesión</button>
        </header>
    );
};

export default Header;
