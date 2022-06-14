import './css/App.css';
import React from 'react';
import Principal from './views/Principal';
import Login from './views/Login';
import Recuperar from './views/Recuperar';
import { EnviarEmail } from './views/EnviarEmail';
import {
  //HashRouter as Router,
  BrowserRouter as Router,
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div>
      <HashRouter basename={''}>

        <Routes>
          <Route exact path="/autenticacion-dsos/usuarios" element={<Principal />}>
          </Route>
          <Route exact path="/autenticacion-dsos/recuperar" element={<Recuperar />}>
          </Route>
          <Route exact path="/autenticacion-dsos/registrar" element={<EnviarEmail />}>
          </Route>
          <Route exact path="/autenticacion-dsos" element={<Login />}>
          </Route>

        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
