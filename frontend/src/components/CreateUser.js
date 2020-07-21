import React, { Component } from 'react'
import axios from 'axios'

export default class CreateUser extends Component {

    //uso state para almacenar usuarios de la bd
    //recibo un username del campo input, se actualiza mediante la escucha el metodo onChangeUsername de la funcion onchange 
    state= {
        users:[],
        username:''
    }

    //con axios consulto el backend y agrego async await pq es asincrono
    async componentDidMount(){
        this.getUsers();
    }
    
    //el metoodo retorna la lista de users de la bd
    //lo uso para actualizar la tabla de usarios luego de cada cosa que hago, agregar , borrar, etc
    getUsers= async() => {
        const res = await axios.get('http://localhost:4000/api/users');
        this.setState({users: res.data});
    }

    //la funcion recibe como parametro un objeto e que es un evento
    //target.value es que escuche lo que se ingresa por teclado
    onChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    //e.preventDefault() evita que se recargue la pagina al apretar submit
    //envio los datos del nuevo usuario al servidor usando axios
    //los datos del nuevo usuario se guardan en el estado state
    onSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:4000/api/users', {
            username: this.state.username
        })
        this.setState({username:''});
        this.getUsers();
    }

    //metodo para eliminar usuarios con doble click, uso axios para eliminarlo de la bd
    deleteUser= async (id) =>{
        await axios.delete('http://localhost:4000/api/users/'+ id)
        this.getUsers();
    }

    render() {
        return (
            <div className= "row">
                <div className="col-md-4">
                    <div className="card card-body">
                        <h3>Create new user</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input type="text" className="form-control"
                                value={this.state.username} 
                                onChange={this.onChangeUsername} />
                            </div>
                            <button className="btn btn-primary">
                                Save
                            </button>
                        </form>
                    </div>
                </div>
                <div className="col-md-8">
                    <ul className="list-group">
                        {
                            this.state.users.map(user => (
                            <li className="list-group-item list-group-item-action" 
                                key={user._id}
                                onDoubleClick={() => this.deleteUser(user._id)}>
                            {user.username}
                            </li>))
                        }

                    </ul>
                </div>
            </div>
        )
    }
}
