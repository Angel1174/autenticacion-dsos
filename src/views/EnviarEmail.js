import '../css/App.css';
import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser';
import '../css/Login.css';
import { NavbarComponent } from '../components/NavbarComponent';

export const EnviarEmail = () => {
    const [nombre, setName] = useState("");
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [estado, setEstado] = useState("");
    const form = useRef();
    function saveData() {
        let data = { nombre, username, email, password, estado }
        fetch("https://servicio-autenticacion.herokuapp.com/login/register", {
            
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((resp) => {
            resp.json().then((result) => {
                console.warn("result", result)
            })
        })
    }
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_aw1kwrf', 'template_c16m3jd', form.current, 'xLEDV1xwlr_h_7lFe')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };
    return (
        <div> <NavbarComponent></NavbarComponent>
            <form ref={form} onSubmit={sendEmail}>

                <div className="wrapper fadeInDown">
                    <div id="formContent">
                        <div className="fadeIn first">
                            <h4 className='h4'>Registro de usuario</h4>
                            <br></br>
                            <input className="fadeIn second" placeholder='Nombre' type="text" name="nombre" required value={nombre} onChange={(e) => { setName(e.target.value) }} />
                            <br />
                            <input className="fadeIn second" placeholder='Usuario' type="text" name="username" id="alias" required value={username} onChange={(e) => { setUserName(e.target.value) }} />
                            <br />
                            <input className="fadeIn second" placeholder='Correo' type="text" name="email" id="email" required value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            <br />
                            <input className="fadeIn third" placeholder='Contraseña' type="password" name="password" required id="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                            <br />
                            <input className="fadeIn second" placeholder='Status' type="text" name="estado" id="status" required={estado} onChange={(e) => { setEstado(e.target.value) }} /><br></br>
                        </div>
                        <input type="submit" onClick={saveData} value="Registrar" />
                    </div>
                </div>
            </form>
        </div>
    );
}