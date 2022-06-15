import '../css/App.css'
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Component} from 'react';
import '../css/Login.css';
import { Link } from 'react-router-dom';
import { NavbarLogin } from '../components/NavbarLogin';


class Recuperar extends Component {

    state = {
        data: [],
        form: {
            id: '',
            nombre: '',
            username: '',
            email: '',
            estado: '',
            password: ''
        },
        error: true,
        errorMSsg: ""
    }

    handleChange = async e => {
        e.persist();
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        //console.log(this.state.form);
    }
    peticionPut = (id) => {
        axios.put("https://servicio-autenticacion.herokuapp.com/login/admin/" + id, this.state.form)
            .then(response => {
                if (response.data.mesage === "Usuario actualizado exitosamente") {
                    this.setState({
                        error: false
                    })
                    //window.location.href = "/servicio-autenticacion/#/usuarios";
                } else {
                    this.setState({
                        error: true,
                        errorMSsg: "Error, campos faltantes"
                    })
                }
            }).catch(error => {
                this.setState({
                    error: true,
                    errorMSsg: "Error, campos faltantes"
                })
            })
    }
    manejadorSubmit(e) {
        e.preventDefault();
    }
    render() {
        const { form } = this.state;
        return (
            <div>
                <NavbarLogin></NavbarLogin>
                <div className="wrapper fadeInDown">
                    <div id="formContent">
                        <div className="fadeIn first">
                            <br></br>
                            <br></br>
                        </div>
                        <h4 className='h4'>Actualización de datos</h4>
                        <br></br>
                        <form onClick={this.manejadorSubmit}>
                            <input type="text" className="fadeIn second" name="id" placeholder="ID de usuario" required onChange={this.handleChange}  value={form.id} />
                            <input type="text" className="fadeIn second" name="nombre" placeholder="Nombre"required  onChange={this.handleChange}  value={form.nombre} />
                            <input type="text" className="fadeIn second" name="username" placeholder="Nuevo Usuario"required  onChange={this.handleChange} value={form.username} />
                            <input type="text" className="fadeIn second" name="email" placeholder="Nuevo correo" required onChange={this.handleChange}  value={form.email} />
                            <input type="password" className="fadeIn third" name="password" placeholder="Nueva contraseña"required onChange={this.handleChange}  value={form.password} />
                            <input type="text" className="fadeIn second" name="estado" placeholder="Status"required onChange={this.handleChange}  value={form.estado} />
                            <br></br>
                            <br></br>
                            <input type="submit" value="Actualizar datos" onClick={() => this.peticionPut(form.id)} />
                        </form>
                        {this.state.error === true &&
                            <div className="alert alert-danger" role="alert">
                                {this.state.errorMSsg}
                            </div>
                        }
                        {this.state.error === false &&
                            <div className="alert alert-success" role="alert">
                                <Link className="nav-link" to={"/"}><span className="material-icons">
                                   Usuario editado, click aquí para continuar
                                </span></Link>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Recuperar;