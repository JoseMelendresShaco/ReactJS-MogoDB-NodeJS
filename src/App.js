// import logo from './logo.svg';
import './App.css';
import React, {Component} from  'react';
// import axios from 'axios'
// import M from 'materialize-css';

class App extends Component {

  constructor(){
    super();
    this.state={
      nombre:"",
      email:"",
      texto:"",
      status:"",
      personas:[],
      _id:""
    }
    this.handleChange = this.handleChange.bind(this);
    this.addPerson = this.addPerson.bind(this);
  }
  addPerson(e){
      if(this.state.status==="Seleccione una opcion" || this.state.nombre==="" || this.state.email==="" || this.state.texto===""){
        alert("Por favor no deje espacios en blanco")
        e.preventDefault();

      }else{
        if(this.state._id){
          fetch(`http://localhost:2000/api/personas/${this.state._id}`,{
          method: 'PUT',
          body: JSON.stringify(this.state),
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
          })
          .then(res=>res.json())
          .then(data=>{
            console.log(data)
            alert("Actualizado con Exito!")
            this.setState({nombre:"",email:"",texto:"",_id:"",status:this.state.status})
            this.getPerson();
          });
        }else{
          console.log(this.state);
      
          fetch('http://localhost:2000/api/personas', {
            method:'POST',
            body: JSON.stringify(this.state),
            headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
          // .then(res => console.log(res))
          .then(res=>res.json())
          .then(data=>{
            console.log(data)
            this.setState({nombre:'',email:'',texto:'',status:this.state.status})
            // M.toast({html:'Persona Guardada'});
            this.getPerson();
            alert("Se a agregado a una persona");
          })
          .catch(err => console.log(err));
          //alert(this.state.value)
        }
      e.preventDefault();
      }
  }

  componentDidMount(){
    this.getPerson();
    console.log("componente fue montado")
  }
  getPerson(){
    fetch('http://localhost:2000/api/personas')
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      this.setState({personas:data});
      console.log(this.state.personas)
    })
    .catch(err=>console.log(err));
  }
  deletePerson(id){
    if(window.confirm("¿Esta seguro que desea eliminarlo?")){
      fetch(`http://localhost:2000/api/personas/${id}`,{
    method: 'DELETE',
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(res=> res.json())
  .then(data=> console.log(data))
  
  
    console.log("eliminando el id", id)
    this.getPerson();
    }
    alert("Persona Eliminada");
  }
  handleChange(e){
    console.log("Nombre: "+e.target.name+" Valor: "+e.target.value);
    // const {name,value} = e.target;
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  editPerson(id){
    fetch(`http://localhost:2000/api/personas/${id}`)
    .then(res=> res.json())
    .then(data=> {console.log(data)
    this.setState({
      nombre: data.nombre,
      email: data.email,
      texto: data.texto,
      status:data.status,
      _id: data._id
    })
    })
  }
  render(){
  return (
    <div>
      <header>
        <nav className="navbar">
          <ul>
            <li className="imgNav">
              <img alt="imagen" src="http://lineadecodigo.com/wp-content/uploads/2020/03/reactjs.png"></img>
            </li>
            <li className="navbar__texto marg"><h1>Bienvenido a mi app de React</h1></li>
          </ul>
        </nav>
      </header>
      <div className="flex-container">
        
        <form onSubmit={this.addPerson} className="form">
          <div className="form__section">
            <input name="nombre" value={this.state.nombre} className="form__input" type="text" placeholder="Ingrese el Nombre" onChange={this.handleChange}></input>
          </div>
          <div className="form__section">
            <input name="email" value={this.state.email} className="form__input" type="email" placeholder="Ingrese el email" onChange={this.handleChange}></input>
          </div>
          <div className="form__section">
          <select className="form__input" name="status" value={this.state.status} onChange={this.handleChange}>
              <option>Seleccione una opcion</option>
              <option>Por decidir</option>
              <option>Aceptado</option>
              <option>Rechazado</option>
          </select>
          </div>
          <div className="form__section">
            <textarea name="texto" value={this.state.texto} className="form__input" type="text" placeholder="Ingrese el texto" onChange={this.handleChange}></textarea>
          </div>
          <div className="form__section">
            <input type="submit" className="form__input" value="Enviar"></input>
          </div>
        </form>
        <div className="form-img">
          <div className="img-container">
          <img alt="imagen2" src="https://virtuales-dev.anuies.mx/web/cursohabilidades/registro/image19o.PNG"></img>
          </div>
        </div>
      </div>
      <div className="tabla">
        
      <table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Texto</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  { 
                    this.state.personas.map(persona => {
                      return (
                        <tr className="filaTabla" key={persona._id}>
                          <td>{persona.nombre}</td>
                          <td>{persona.email}</td>
                          <td>{persona.texto}</td>
                          <td>{persona.status}</td>
                          <button className="fas fa-user-edit" onClick={()=> this.editPerson(persona._id)}></button>
                          <button className="fas fa-trash-alt" onClick={()=>this.deletePerson(persona._id)}></button>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
      {/* <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Texto</th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.personas.map(persona=>{
              return(
                <tr>
                  <td>{persona.nombre}</td>
                  <td>{persona.nombre}</td>
                  <td>{persona.nombre}</td>
                </tr>
              )
            })
          }
        </tbody>
    </table> */}
    </div>
    </div>
  );
}
}

export default App;
