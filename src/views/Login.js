import React from "react";
import '../css/Login.css';
import user2 from '../components/img/user2.png';
import { NavbarLogin } from "../components/NavbarLogin";
import { Link } from 'react-router-dom';
class Login extends React.Component {
    /**
     * Inicializamos las variables a utilizar
     * usernameOrEmail: indica un correo o usuario
     * password: indica la contraseña
     */
    state = {
        form: {
            "usernameOrEmail": "",
            "password": ""
        },
        error: true,
        errorMSsg: ""
    }

    manejadorSubmit(e) {
        e.preventDefault();
    }
    /**
     * Método para el evento de capturar lo que se escribe por teclado
     * @param {Evento} e 
     */
    handleChange = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }
    
    /**
     * Metodo que hace la petición para conocer si el correo/usuario y contraseña ingresada se encuentran en la BD
     * Si se encuentra lanzamos el mensaje para darle acceso
     * Si no se encuentra lanzamos mensaje de error
     */
    iniciarSesion = async () => {
        fetch("https://autenticacion-p.herokuapp.com/login/auth/user", {
            method: 'POST',
            body: JSON.stringify(this.state.form), 
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response =>{ 
            if (response.httpCode === 200) {
                this.setState({
                    error: false 
                })
            } else {
                this.setState({
                    error: true,
                    errorMSsg: "Datos faltantes, credenciales incorrectas o usuario bloqueado"
                })
            }
            console.log('Success:', response)});
    }
    /**
     * 
     * @returns retornamos el formulario a renderizar
     */
    render() {

        return (
            <div>
                <NavbarLogin></NavbarLogin>
                <div className="wrapper fadeInDown">
                    <div id="formContent">
                        <img src={user2} alt="" width="100px" />
                        <form onClick={this.manejadorSubmit}>
                            <input type="text" className="fadeIn second" name="usernameOrEmail" placeholder="Correo/Usuario" onChange={this.handleChange} />
                            <input type="password" className="fadeIn third" name="password" placeholder="Contraseña" onChange={this.handleChange} />
                            <input type="submit" value="Iniciar sesión" onClick={() => this.iniciarSesion()} />
                        </form>
                        <Link className="nav-link" to={"/password"}><span className="material-icons">
                            ¿Olvidaste tu contraseña?, click aquí
                        </span></Link>
                        {this.state.error === true &&
                            <div className="alert alert-danger" role="alert">
                                {this.state.errorMSsg}
                            </div>
                        }
                        {this.state.error === false &&
                            <div className="alert alert-success" role="alert">
                                <Link className="nav-link" to={"/usuarios"}><span className="material-icons">
                                    Datos correctos, click aquí para continuar
                                </span></Link>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;