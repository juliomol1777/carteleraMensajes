import React, { Component } from 'react'
import axios from 'axios'
import Datepicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default class CreateNote extends Component {

    state = {
        users: [],
        userSelected: '',
        title: '',
        content: '',
        date: new Date(),
        editing: false,
        _id: ''
    }

    //hago un get de la bd y con el resultado de los objetos obtenidos hago un map
    //para extraer solo su username
    //agrego userSelected= res.data[0].username, para que me tome el usuario en el metodo onSubmit
    //desde NoteList se redirige a CreteNote con un boton edit (Link) al redirigirse el objeto a editar
    //puedo extraer su id, y puedo verificar la existencia de ese id para editar o la no existencia para crear, usando el if
    // si el id existe y es para editar nota, le paso el (title, content, date y author) de la nota a editar
    //cuando apreto el boton editar, se cargan los datos de la nota a editar en el formulario, usando los valores dados en el 
    //value de los select y de los textarea e inputarea
    async componentDidMount() {
        const res = await axios.get('http://localhost:4000/api/users');
        console.log(res);
        this.setState({
            users: res.data.map(user => user.username),
            userSelected: res.data[0].username
        })
        if (this.props.match.params.id) {
            const resp = await axios.get('http://localhost:4000/api/notes/' + this.props.match.params.id);
            console.log(resp.data);
            this.setState({
                title: resp.data.title,
                content: resp.data.content,
                date: new Date(resp.data.date),
                userSelected: resp.data.author,
                editing: true,
                _id: resp.data._id
            });
        }
    }

    //envio al backend las propiedades que estan en el state
    //con window.location.href='/'; uego de dar submit me redirige a la pagina raiz
    //uso el if para enviar al servidor una nueva nota o si es editar una nota se relaciona con el metodo de arriba
    onSubmit = async (e) => {
        e.preventDefault();
        const newNote = {
            title: this.state.title,
            content: this.state.content,
            date: this.state.date,
            author: this.state.userSelected
        };
        if (this.state.editing) {
            const ids= this.state._id
            console.log(ids);
            await axios.put('http://localhost:4000/api/notes/' + this.state._id, newNote);
            console.log(newNote);
        } else {
            await axios.post('http://localhost:4000/api/notes', newNote);
            console.log(newNote);
        }
        window.location.href = '/';
    }

    //escucha el evento de la seleccion de users del formulario
    //agrego la propiedad al state, el userSelected
    //utilizo la misma funcion en varios campos porque el evento es igual, 
    //debo agregar sus name(userSelected, title,content) al state
    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onChangeDate = date => {
        this.setState({ date });
    }
    //offset-md-2
    render() {
        return (
            <div className="col md-6 ">
                <div className="card card-body">
                    <h4>Create Note</h4>
                    {/**Select user */}
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <select className="form-control"
                                name="userSelected"
                                onChange={this.onInputChange}
                                value={this.state.userSelected}>
                                {
                                    this.state.users.map(user => (
                                        <option key={user} value={user}>
                                            {user}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <input type="text"
                                className="form-control"
                                placeholder="Titulo" name="title"
                                onChange={this.onInputChange}
                                value={this.state.title} />
                        </div>
                        <div className="form-group">
                            <textarea type="text"
                                name="content"
                                className="form-control"
                                placeholder="Content" required
                                onChange={this.onInputChange}
                                value={this.state.content}>
                            </textarea>
                        </div>
                        <div className="form-group">
                            <Datepicker className="form-control"
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Create
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
