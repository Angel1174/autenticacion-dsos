import '../css/App.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Component } from 'react';
import { NavbarComponent } from '../components/NavbarComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

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
  modalInsertar2 = () => {
    this.setState({ modalInsertar2: !this.state.modalInsertar2 });
  }

  peticionGet = () => {
    axios.get("https://autenticacion-t.herokuapp.com/login/admin/").then(
      response => {
        this.setState({ data: response.data.data });
      }).catch(error => {
        console.log(error.message);
      })
  }

  peticionPut = () => {
    fetch('https://autenticacion-t.herokuapp.com/login/admin/' + this.state.form.id, {
      method: 'PUT',
      body: this.state.form
    })
      .then(response => response.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response))
  }

  seleccionarUsuario = (usuario) => {
    this.setState({
      tipoModal: 'actualizar',
      form: {
        id: usuario.id,
        nombre: usuario.nombre,
        username: usuario.username,
        email: usuario.email,
        estado: usuario.estado
      }
    })
  }
  /*
    removeUsuario = (id) => {
      fetch("https://autenticacion-d.herokuapp.com/login/admin" + id, {
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
    */
  //Ciclo de vida
  componentDidMount() {
    this.peticionGet();
  }

  render() {
    const { form } = this.state;

    return (
      <div>
        <NavbarComponent></NavbarComponent>
        <div className="App" >
          <center>
            <Link to={"/registrar"}><input type="submit" value="Registrar nuevo usuario" /></Link>
            <div className='table-responsive'>
              <table className="table-hover table-dark" >
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Usuario</th>
                    <th scope="col">Correo</th>
                    <th scope="col">Estado</th>
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
                        <td>
                          <div className="btn-group btn-group-justified">
                            <button type="button" className="btn btn-success" onClick={() => { this.seleccionarUsuario(usuario); this.modalInsertar2() }}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></button>
                          </div>
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
              <input className="form-control" placeholder='Nombre' type="text" name="nombre" id="nombre" required onChange={this.handleChange} value={form ? form.nombre : ''} />
              <input className="form-control" placeholder='Usuario' type="text" name="username" id="alias" onChange={this.handleChange} value={form ? form.username : ''} />
              <input className="form-control" placeholder='Correo' type="text" name="email" id="email" disabled onChange={this.handleChange} value={form ? form.email : ''} />
              <input className="form-control" placeholder='Status' type="status" name="estado" id="status" onChange={this.handleChange} value={form.estado} />
              <br></br>
              <button type="button" className="btn btn-outline-primary" onClick={() => this.peticionPut()}>Aplicar</button>&nbsp;&nbsp;&nbsp;
              <button type="button" className="btn btn-outline-danger" onClick={() => this.modalInsertar2()}>Cancelar</button>
            </ModalBody>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Principal;