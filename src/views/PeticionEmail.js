import { useForm } from "../hooks/useForm";
import '../css/Login.css';
import { NavbarLogin } from '../components/NavbarLogin';
import '../css/App.css';
import Loader from '../components/Loader';
import formu from '../components/img/formu.png';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
const initialFom = {
    email:"",
};
const validationsForm = (form) => {
    let errors={};
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/; //correo electronico valido
    if(!form.email.trim()){
        errors.email="El campo email es requerido";
    }else if(!regexEmail.test(form.email.trim())){
        errors.email="El campo email es incorrecto";
    }
    return errors;
};
let styles={
    fontWeight:"bold",
    color:"#dc3545"
}
const PeticionEmail = () => {

    const {
        form,
        errors,
        loading,
        response,
        handleChange,
        handleBlur,
        handleSubmitEmail,
    } = useForm(initialFom, validationsForm);
    return (
        <div><NavbarLogin></NavbarLogin>
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <img src={formu} alt="" width="100px" />
                    <form onSubmit={handleSubmitEmail}>               
                        <input type="email" name="email" placeholder="Ingrese su correo" onBlur={handleBlur} onChange={handleChange} value={form.email} required></input>
                        {errors.email && <p style={styles}>{errors.email}</p>} 
                        <input type="submit" value="Solicitar"></input>
                    </form>
                    <Link className="nav-link" to={"/"}><span className="material-icons">
                            Regresar al Login
                        </span></Link>
                    {loading && <Loader/>}
                    {response && (
                        <Message msg="Petición enviada" bgColor="#198754"></Message>
                    )}
                </div>
            </div>
        </div>
    );
};
export default PeticionEmail;