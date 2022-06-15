import '../css/App.css';
import React, { useState } from 'react'
import {Link} from 'react-router-dom';
import user2 from '../components/img/user2.png';
import { NavbarLogin } from "../components/NavbarLogin";
import { useNavigate } from "react-router-dom";
import '../css/Login.css';


export const Login2 = () => {
   
    const [usernameOrEmail, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

   async function iniciarSesion() {
        console.warn(usernameOrEmail,password)
        let data = { usernameOrEmail, password }
        let result=await fetch("https://servicio-autenticacion.herokuapp.com/login/auth", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(data)
        });
        result=await result.json();
        navigate("/usuarios");
    }
    //navigate("/usuarios");
    return (
        <div><NavbarLogin></NavbarLogin>
        <div className="wrapper fadeInDown">
            <div id="formContent">
                <div className="fadeIn first">

                    <br></br>
                    <img src={user2} width="100px" />
                    <br></br>
                    <br></br>
                </div>
                <form>
                    <input type="text" className="fadeIn second" name="usernameOrEmail" placeholder="Correo/Usuario" onChange={(e) => { setUserName(e.target.value) }} />
                    <input type="password" className="fadeIn third" name="password" placeholder="Contraseña" onChange={(e) => { setPassword(e.target.value) }} />
                    <br></br>
                    <br></br>
                    <button className='btn btn-primary'  onClick={iniciarSesion}>Iniciar sesión</button>
                </form>
                <Link className="nav-link" to={"/recuperar"}><span className="material-icons">
                    ¿Necesitas actualizar datos?, click aquí
                </span></Link>

            </div>
        </div>
    </div>
    );
}