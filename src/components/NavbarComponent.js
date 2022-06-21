import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link} from 'react-router-dom';

export const NavbarComponent = () => {

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to={"/usuarios"}>S. Autenticación</Link>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-item nav-link" to={"/usuarios"}>Usuarios <span className="sr-only">(current)</span></Link>
                        <Link className="nav-item nav-link" to={"/registrar"}>Registro</Link>
                        <Link className="nav-item nav-link" to={"/"}>Salir</Link>
                    </div>
                </div>
            </nav>
        </div>
    );
}


