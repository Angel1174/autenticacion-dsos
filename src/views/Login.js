import React from "react";
import '../css/Login.css';
import user2 from '../components/img/user2.png';
import axios from "axios";
import { NavbarLogin } from "../components/NavbarLogin";
import { Link } from 'react-router-dom';
class Login extends React.Component {

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

    handleChange = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }
    
    
    iniciarSesion = async () => {
        fetch("https://autenticacion-t.herokuapp.com/login/auth/user", {
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