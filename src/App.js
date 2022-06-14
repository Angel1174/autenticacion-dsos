import './css/App.css';
import React from 'react';
import Principal from './views/Principal';
import Login from './views/Login';
import Recuperar from './views/Recuperar';
import { EnviarEmail } from './views/EnviarEmail';
import {
  //HashRouter as Router,
  //BrowserRouter as Router,
  HashRouter,
  Routes,
  Route,
  //BrowserRouter,
} from "react-router-dom";

function App() {
  return (
    <div>
      <HashRouter basename={``}>
        <Routes>
          <Route path="/autenticacion-dsos/usuarios" element={<Principal />}>
          </Route>
          <Route path="/autenticacion-dsos/recuperar" element={<Recuperar />}>
          </Route>
          <Route  path="/autenticacion-dsos/registrar" element={<EnviarEmail />}>
          </Route>
          <Route exact path="/autenticacion-dsos" element={<Login />}>
          </Route>

        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
