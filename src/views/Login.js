import React from "react";
import '../css/Login.css';
import user2 from '../components/img/user2.png';
import axios from "axios";
import { NavbarLogin } from "../components/NavbarLogin";
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
class Login extends React.Component {

    state = {
        form: {
            "usernameOrEmail": "",
            "password": ""
        },
        error: false,
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
        //console.log(this.state.form);
    }
    
    iniciarSesion = async () => {
        //let navigate = useNavigate();
        axios.post("https://servicio-autenticacion.herokuapp.com/login/auth", this.state.form)
            .then(response => {
                if (response.data.mesage === "Ok") {
                    alert("Bienvenido ");
                    
                   // window.location.href = "/servicio-autenticacion/#/usuarios";
                } else {
                    this.setState({
                        error: true,
                        errorMSsg: "Credenciales incorrectas"
                    })
                }
            }).catch(error => {
                this.setState({
                    error: true,
                    errorMSsg: "Credenciales incorrectas"
                })
            })
    }

    render() {

        return (
            <div>
                <NavbarLogin></NavbarLogin>
                <div className="wrapper fadeInDown">
                    <div id="formContent">
                        <div className="fadeIn first">

                            <br></br>
                            <img src={user2} width="100px" />
                            <br></br>
                            <br></br>
                        </div>
                        <form onClick={this.manejadorSubmit}>
                            <input type="text" className="fadeIn second" name="usernameOrEmail" placeholder="Correo/Usuario" onChange={this.handleChange} />
                            <input type="password" className="fadeIn third" name="password" placeholder="Contraseña" onChange={this.handleChange} />
                            <br></br>
                            <br></br>
                            <Link to={"/usuarios"}><button className='btn btn-primary'  onClick={() => this.iniciarSesion()}>Iniciar sesión</button></Link>
                        </form>
                        <Link className="nav-link" to={"/recuperar"}><span className="material-icons">
                            ¿Necesitas actualizar datos?, click aquí
                        </span></Link>
                        {this.state.error === true &&
                            <div className="alert alert-danger" role="alert">
                                {this.state.errorMSsg}
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;