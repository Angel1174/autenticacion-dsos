import { useForm } from "../hooks/useForm";
import '../css/Login.css';
import { NavbarComponent } from '../components/NavbarComponent';
import '../css/App.css';
import Loader from '../components/Loader';
import formu from '../components/img/formu.png';
import Message from '../components/Message';
const initialFom = {
    nombre:"",
    username:"",
    email:"",
    password:"",
    estado:"",
};
const validationsForm = (form) => {
    let errors={};
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/; //Letras minusculas, vacias, espacios en blanco, acentos
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/; //correo electronico valido
    let regexPassword = /^.{4,14}$/; //de 4 a 14 caracteres
    if(!form.nombre.trim()){
        errors.nombre="El campo nombre es requerido";
    }else if(!regexName.test(form.nombre.trim())){
        errors.nombre="El campo nombre sólo acepta letras y espacios en blanco";
    }

    if(!form.username.trim()){
        errors.username="El campo usuario es requerido";
    }

    if(!form.email.trim()){
        errors.email="El campo email es requerido";
    }else if(!regexEmail.test(form.email.trim())){
        errors.email="El campo Email es incorrecto";
    }

    if(!form.password.trim()){
        errors.password="El campo contraseña es requerido";
    }else if(!regexPassword.test(form.password.trim())){
        errors.password="El campo contraseña debe ser de 4 a 14 caracteres";
    }

    if(!form.estado.trim()){
        errors.estado="El campo estado es requerido";
    }

    return errors;
};
let styles={
    fontWeight:"bold",
    color:"#dc3545"
}
const RegisterForm = () => {

    const {
        form,
        errors,
        loading,
        response,
        handleChange,
        handleBlur,
        handleSubmit,
    } = useForm(initialFom, validationsForm);
    return (
        <div><NavbarComponent></NavbarComponent>
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <img src={formu} alt="" width="100px" />
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="nombre" placeholder="Ingrese su nombre" onBlur={handleBlur} onChange={handleChange} value={form.nombre} required></input>
                        {errors.nombre && <p style={styles}>{errors.nombre}</p>}
                        <input type="text" name="username" placeholder="Ingrese su usuario" onBlur={handleBlur} onChange={handleChange} value={form.username} required></input>
                        {errors.username && <p style={styles}>{errors.username}</p>}
                        <input type="email" name="email" placeholder="Ingrese su correo" onBlur={handleBlur} onChange={handleChange} value={form.email} required></input>
                        {errors.email && <p style={styles}>{errors.email}</p>}
                        <input type="password" name="password" placeholder="Ingrese su contraseña" onBlur={handleBlur} onChange={handleChange} value={form.password} required></input>
                        {errors.password && <p style={styles}>{errors.password}</p>}
                        <input type="text" name="estado" placeholder="Status" onBlur={handleBlur} onChange={handleChange} value={form.estado} required></input>
                        {errors.estado && <p style={styles}>{errors.estado}</p>}
                        <input type="submit" value="Registrar usuario"></input>
                    </form>
                    {loading && <Loader/>}
                    {response && (
                        <Message msg="Usuario registrado correctamente, verifica tu correo electrónico" bgColor="#198754"></Message>
                    )}
                </div>
            </div>
        </div>
    );
};
export default RegisterForm;