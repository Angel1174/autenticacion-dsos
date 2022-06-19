import { useState } from 'react';
/**
 * 
 * @param {recibe los datos que se están enviando en los formularios} initialForm 
 * @param {recibe las validaciones que se envían desde el formulario} validateForm 
 * @returns 
 */
export const useForm = (initialForm, validateForm) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  /**
   * 
   * @param {metodo para registrar lo que se escribe en los inputs} e 
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  /**
   * Método para mostrar las advertencias
   * @param {*} e 
   */
  const handleBlur = (e) => {
    handleChange(e);
    setErrors(validateForm(form));
  };
  /**
   * Metodo que realiza dos peticiones post
   * El primer fetch es para enviar los datos al correo
   * El segundo fetch es para enviar la petición de registro del usuario a la API
   * @param {Se recibe el evento} e 
   * @returns 
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateForm(form));
    if (Object.keys(errors).length === 0) {
      alert("Enviando")
      setLoading(true);
      peticionEmail(form.email,form)
      fetch("https://autenticacion-t.herokuapp.com/login/register", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(form)
      }).then((res) => {
        setLoading(false);
        setResponse(true);
        setForm(initialForm);
        setTimeout(() => setResponse(false), 5000);
      });
    } else {
      return;
    }
  }

  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    setErrors(validateForm(form));
    if (Object.keys(errors).length === 0) {
      alert("Enviando")
      setLoading(true);
      //peticionEmail(form.email,form)
      fetch("https://autenticacion-t.herokuapp.com/login/admin/" +form.id, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(form)
      }).then((res) => {
        setLoading(false);
        setResponse(true);
        setForm(initialForm);
        setTimeout(() => setResponse(false), 5000);
      });
    } else {
      return;
    }
  }
  /**
   * 
   * @param {Recibe como parámetro el correo electrónico que se ingresa en el input} correo 
   * @param {"Recibe como parámetro el cuerpo del correo que se desea enviar"} mensaje 
   */
  const peticionEmail = (correo, mensaje) => {
    fetch("https://formsubmit.co/ajax/" + correo, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify (mensaje)
    }).then((res) => {

    });
  }
  const handleSubmitEmail = (e) => {
    e.preventDefault();
    setErrors(validateForm(form));
    if (Object.keys(errors).length === 0) {
      alert("Enviando petición")
      setLoading(true);
      fetch("https://autenticacion-t.herokuapp.com/login/recuperar/" + form.email, {
        method: 'POST',
        body: JSON.stringify(form), 
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          if (response.httpCode === 200) {
            let password=response.data;
            var datos={Asunto:"Recuperación de contraseña", Aviso:"A continuación se enlista tu nueva contraseña, guardala e inicia sesión en el sistema con tu usuario y nueva contraseña, si deseas cambiarla, dirígete a la sección de editar usuario en la tabla de usuarios", password, Atentamente:"Servicio de autenticación"}
            peticionEmail(form.email,datos);
            setLoading(false);
            setResponse(true);
            setForm(initialForm);
            setTimeout(() => setResponse(false), 5000);
            console.log('Success:', response)
          } else return;

        });
    } else {
      return;
    }
  }
  /**
   * Se retorna el form de los datos, los errores, animación de loagind, response y los eventos de botón y form
   */
  return {
    form, errors, loading, response, handleChange, handleBlur, handleSubmit, handleSubmitEmail,handleSubmitUpdate
  };
}