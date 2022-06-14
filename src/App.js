import './css/App.css';
import React from 'react';
import Principal from './views/Principal';
import Login from './views/Login';
import Validar from './views/Validar';
import Recuperar from './views/Recuperar';
import { EnviarEmail } from './views/EnviarEmail';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
            <Routes>
            <Route exact path="/autenticacion-dsos/usuarios" element={<Principal/>}>
              </Route>
              <Route exact path="/autenticacion-dsos/validar" element={<Validar/>}>
              </Route>
              <Route exact path="/autenticacion-dsos/recuperar" element={<Recuperar/>}>
              </Route>
              <Route exact path="/autenticacion-dsos/registrar" element={<EnviarEmail/>}>
              </Route>
              <Route exact path="/autenticacion-dsos" element={<Login/>}>
              </Route>
              
            </Routes>
    </Router>
  );
}

export default App;
