import { useState } from 'react';

export const useForm = (initialForm, validateForm) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    handleChange(e);
    setErrors(validateForm(form));
  };
  const peticionEmail=()=>{
    fetch("https://formsubmit.co/ajax/" + form.email, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(form)
      }).then((res) => {

      });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateForm(form));
    if (Object.keys(errors).length === 0) {
      alert("Enviando")
      setLoading(true);
      fetch("https://formsubmit.co/ajax/" + form.email, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(form)
      }).then((res) => {

      });
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
  const handleSubmitEmail = (e) => {
    e.preventDefault();
    setErrors(validateForm(form));
    if (Object.keys(errors).length === 0) {
      alert("Enviando petición")
      setLoading(true);
      fetch("https://autenticacion-t.herokuapp.com/login/admin/", {
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
  return {
    form, errors, loading, response, handleChange, handleBlur, handleSubmit, handleSubmitEmail
  };
}