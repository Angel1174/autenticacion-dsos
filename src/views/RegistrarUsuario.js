import React from "react";
import '../css/Login.css';
import axios from "axios";
import { Link } from 'react-router-dom';
import { LeyendaError, GrupoInput } from '../components/Formularios';
import { NavbarComponent } from '../components/NavbarComponent';
class RegistrarUsuario extends React.Component {
    state = {
        form: {
            "nombre": "",
            "username": "",
            "email": "",
            "password": "",
            "estado": ""
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
    registrarUsuario = async () => {
        axios.post("https://autenticacion-t.herokuapp.com/login/register", this.state.form)
            .then(response => {
                if (response.data.mesage === "Usuario registrado exitosamente") {
                    this.setState({
                        error: false
                    })
                } else {
                    this.setState({
                        error: true,
                        errorMSsg: "Completa todos los campos"
                    })
                }
            }).catch(error => {
                this.setState({
                    error: true,
                    errorMSsg: "Error en la petición"
                })
            })
    }
    render() {

        return (
            <div> <NavbarComponent></NavbarComponent>
                <div className="wrapper fadeInDown">
                    <div id="formContent">
                        <div className="fadeIn first">
                            <h4 className='h4'>Registro de usuario</h4>
                            <GrupoInput>
                                <input placeholder='Nombre' type="text" name="nombre" onChange={this.handleChange} />
                                <LeyendaError>*Campo nombre obligatorio</LeyendaError>
                                <input placeholder='Usuario' type="text" name="username" id="alias" onChange={this.handleChange} />
                                <LeyendaError>*Campo usuario obligatorio</LeyendaError>
                                <input placeholder='Correo' type="text" name="email" id="email" onChange={this.handleChange} />
                                <LeyendaError>*Campo correo obligatorio</LeyendaError>
                                <input placeholder='Contraseña' type="password" name="password" id="password" onChange={this.handleChange} />
                                <LeyendaError>*Campo contraseña obligatorio</LeyendaError>
                                <input placeholder='Status' type="text" name="estado" id="status" onChange={this.handleChange} />
                                <LeyendaError>*Campo Status obligatorio</LeyendaError>
                                <input type="submit" value="Registrar usuario" onClick={() => this.registrarUsuario()} />
                            </GrupoInput>

                            {this.state.error === true &&
                                <div className="alert alert-danger" role="alert">
                                    {this.state.errorMSsg}
                                </div>
                            }
                            {this.state.error === false &&
                                <div className="alert alert-success" role="alert">
                                    <Link className="nav-link" to={"/usuarios"}><span className="material-icons">
                                        Usuario registrado exitosamente, click aquí para ir a la lista de usuarios
                                    </span></Link>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default RegistrarUsuario;