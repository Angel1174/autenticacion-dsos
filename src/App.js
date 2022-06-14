import './css/App.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

class Principal extends Component {
  state = {
    data: [],
    modalInsertar2: false,//editar
    form: {
      id: '',
      nombre: '',
      username: '',
      email: '',
      estado: '',
      password: '',
      tipoModal: ''
    }
  }

  handleChange = async e => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
    //console.log(this.state.form);
  }
  registrarUser=()=>{
    window.location.href = "./registrar";
  }

  modalInsertar2 = () => {
    this.setState({ modalInsertar2: !this.state.modalInsertar2 });
  }

  peticionGet = () => {
    axios.get("https://servicio-autenticacion.herokuapp.com/login/admin/").then(
      response => {
        this.setState({ data: response.data.data });
      }).catch(error => {
        console.log(error.message);
      })
  }

  peticionPut = () => {
    axios.put("https://servicio-autenticacion.herokuapp.com/login/admin/" + this.state.form.id, this.state.form)
    .then(response => {

      this.modalInsertar2();
      window.alert('Usuario editado con éxito');
      this.peticionGet();
    })
  }
  seleccionarUsuario = (usuario) => {
    this.setState({
      tipoModal: 'actualizar',
      form: {
        id: usuario.id,
        nombre: usuario.nombre,
        username: usuario.username,
        email: usuario.email,
        estado: usuario.estado,
        password: usuario.password
      }
    })
  }
  removeUsuario = (id) => {
    fetch("https://servicio-autenticacion.herokuapp.com/login/admin/" + id, {
      method: 'DELETE'
    })
      .then(res => res.json())

  }
  metodoDelete = (id) => {
    var resultado = window.confirm('¿Estás seguro de eliminar el usuario?');
    if (resultado === true) {
      this.removeUsuario(id);
      window.alert('Usuario eliminado correctamente');
      this.peticionGet();
    } else {
      return 0;
    }

  }
  //Ciclo de vida
  componentDidMount() {
    this.peticionGet();
  }

  render() {
    const { form } = this.state;

    return (
      <div>
       
        <div className="App" >
          <br />
          <center>
            <button className='btn btn-primary' onClick={() => { this.registrarUser() }}>Registrar nuevo usuario </button>
          </center>
          <br /><br />
          <center>
            <div className='table-responsive'>
            <table className="table-hover table-dark" >
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Usuario</th>
                  <th scope="col">Correo</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Contraseña</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.map(usuario => {
                  return (
                    <tr className="bg-primary">
                      <td align="center">{usuario.id}</td>
                      <td align="center">{usuario.nombre}</td>
                      <td align="center">{usuario.username}</td>
                      <td align="center">{usuario.email}</td>
                      <td align="center">{usuario.estado}</td>
                      <td align="center">{usuario.password}</td>
                      <td>
                        <button type="button" className="btn btn-success" onClick={() => { this.seleccionarUsuario(usuario); this.modalInsertar2() }}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></button>
                        &nbsp;&nbsp;&nbsp;
                        <button type="button" className="btn btn-danger" onClick={() => this.metodoDelete(usuario.id)} ><FontAwesomeIcon icon={faTrashAlt} /></button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
          </center>
          {
          }
          <Modal isOpen={this.state.modalInsertar2}>
            <ModalHeader>
              Actualización de Usuario
            </ModalHeader>
            <ModalBody>
              <div className="form-group">
                <input className="form-control" placeholder='Nombre' type="text" name="nombre" id="nombre" required onChange={this.handleChange} value={form ? form.nombre : ''} />
                <br />
                <input className="form-control" placeholder='Usuario' type="text" name="username" id="alias" onChange={this.handleChange} value={form ? form.username : ''} />
                <br />
                <input className="form-control" placeholder='Correo' type="text" name="email" id="email" disabled onChange={this.handleChange} value={form ? form.email : ''} />
                <br />
                <input className="form-control" placeholder='Contraseña' type="password" name="password" id="password" disabled onChange={this.handleChange} value={form ? form.password : ''} />
                <br />
                <input className="form-control" placeholder='Status' type="status" name="estado" id="status" onChange={this.handleChange} value={form.estado} />

              </div>
            </ModalBody>

            <ModalFooter>
              <button className="btn btn-primary" onClick={() => this.peticionPut()}>
                Actualizar
              </button>
              &nbsp;&nbsp;&nbsp;
              <button className="btn btn-danger" onClick={() => this.modalInsertar2()}>Cancelar</button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Principal;