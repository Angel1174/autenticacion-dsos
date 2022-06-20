import './css/App.css';
import React from 'react';
import Principal from './views/Principal';
import Login from './views/Login';
import {HashRouter, Routes,Route} from "react-router-dom";
import RegisterForm from './views/RegisterForm';
import PeticionEmail from './views/PeticionEmail';
function App() {
  /**
   * Esta sección nos sirve para poder tener las rutas a nuestras vistas
   * Vistas: usuarios->sección del listado de la tabla con todos los usuarios
   * registrar->sección para registrar a un nuevo usuario
   * password->sección para solicitar recuperación de contraseña
   * /->sección del login
   */
  return (
    <div>
      <HashRouter basename={``}>
        <Routes>
          <Route path="/usuarios" element={<Principal />}>
          </Route>
          <Route  path="/registrar" element={<RegisterForm/>}>
          </Route>
          <Route  path="/password" element={<PeticionEmail />}>
          </Route>
          <Route exact path="/" element={<Login />}>
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
