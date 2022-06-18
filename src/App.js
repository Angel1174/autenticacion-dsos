import './css/App.css';
import React from 'react';
import Principal from './views/Principal';
import Login from './views/Login';
import {HashRouter, Routes,Route} from "react-router-dom";
import RegisterForm from './views/RegisterForm';
import PeticionEmail from './views/PeticionEmail';
function App() {
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
