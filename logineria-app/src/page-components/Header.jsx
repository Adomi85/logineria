import logo from "../assets/logineria-logo.png";
import "../styles/header.css";

const Header = () => {
    return (
        <>
            <header className="page-header">
                <section className="page-header-wrapper">
                    <img className="page-header-logo" src={logo}></img>
                    <p className="page-header-text">logineria</p>
                </section>
            </header>
            <hr className="page-header-separator"/>
        </>
    )
};


export default Header;