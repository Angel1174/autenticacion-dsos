import React from "react";
import '../css/Login.css';
import axios from "axios";
import { NavbarComponent } from '../components/NavbarComponent';
class Validar extends React.Component {

    state = {
        form: {
            "data": "",
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
    
    validar = async () => {
        axios.post("https://servicio-autenticacion.herokuapp.com/login/auth", this.state.form)
            .then(response => {
                if (response.data.mesage === "Ok") {
                    alert("Token válido");
                    window.location.href = "./usuarios";
                } else {
                    this.setState({
                        error: true,
                        errorMSsg: "Token inválido"
                    })
                }
            }).catch(error => {
                this.setState({
                    error: true,
                    errorMSsg: "Token inválido"
                })
            })
    }
    
    render() {
        return (
            <div>
                <NavbarComponent></NavbarComponent>
                <div className="wrapper fadeInDown">
                    <div id="formContent">
                        <div className="fadeIn first">
                        </div>
                        <h4 className="h4">Validar token</h4>
                        <br></br>
                        <form onClick={this.manejadorSubmit}>
                            <input type="text" className="fadeIn second" name="data" placeholder="Ingresa el Token" onChange={this.handleChange} />
                            <br></br>
                            <input type="submit" className="fadeIn fourth" value="Validar token" onClick={() => this.validar()} />
                        </form>
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
export default Validar;