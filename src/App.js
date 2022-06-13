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
            <Route exact path="/usuarios" element={<Principal/>}>
              </Route>
              <Route exact path="/validar" element={<Validar/>}>
              </Route>
              <Route exact path="/recuperar" element={<Recuperar/>}>
              </Route>
              <Route exact path="/registrar" element={<EnviarEmail/>}>
              </Route>
              <Route exact path="/" element={<Login/>}>
              </Route>
              
            </Routes>
    </Router>
  );
}

export default App;
