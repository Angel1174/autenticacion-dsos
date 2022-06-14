import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
export const NavbarComponent = (props = {}) => {

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="./usuarios">S. Autenticación</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-item nav-link" href="./usuarios">Usuarios <span className="sr-only">(current)</span></a>
                        <a className="nav-item nav-link" href="./registrar">Registro</a>
                        <a className="nav-item nav-link" href="./validar">Validar Token</a>
                        <a className="nav-item nav-link" href="./">Salir</a>
                    </div>
                </div>
            </nav>
        </div>
    );
}


