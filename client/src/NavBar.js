import React from "react";
import { Link } from 'react-router-dom';

function NavBar() {
    return (

        <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
            <div className="container">
            <Link to="/">
                <a className="navbar-brand" href="http://hello.com/">Start Bootstrap</a>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                    <Link to="/">
                        <li className="nav-item active">
                            <a className="nav-link" href="http://hello.com/">Home
                            <span className="sr-only">(current)</span>
                            </a>
                        </li>
                    </Link>
                    <li className="nav-item">
                        <a className="nav-link" href="http://hello.com/">About</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="http://hello.com/">Services</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="http://hello.com/">Contact</a>
                    </li>
                    <Link to="/login">
                        <li className="nav-item login">
                            <a className="nav-link" href="http://hello.com/">Login</a>
                        </li>
                    </Link>
                </ul>
            </div>
            </div>
        </nav>

    );
}

export default NavBar;