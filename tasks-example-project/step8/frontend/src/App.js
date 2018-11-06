import React, { Component } from 'react';
import NavBar from './components/NavBar';
import Main from './components/Main';
import logo from './logo.svg';
import {withRouter} from 'react-router-dom'; 
import {connect} from 'react-redux';
import './App.css';
import {getUserlist,getTasks} from './actions/taskActions';
import {loginRedirect} from './actions/loginActions';

class App extends Component {
  constructor(props) {
	  super(props);
	  this.state= {
		  mode:"Add",
		  editTask:{}
	  }
  }
  
  static getDerivedStateFromProps(newProps,prevState) {
	  if(newProps.redirect) {
		  newProps.dispatch(getUserlist(newProps.token));
		  newProps.dispatch(getTasks(newProps.token))
		  newProps.dispatch(loginRedirect());
	  }
  }
  
  componentDidMount() {
	  if(sessionStorage.getItem("isLogged")) {
			let temp;
			let isLogged = sessionStorage.getItem("isLogged");
			if(isLogged === "true") {
				temp = true
			} else {
				temp = false
			}
			let token = sessionStorage.getItem("token")
			if(temp === true) {
				this.props.dispatch(getTasks(token));
				this.props.dispatch(getUserlist(token))
			}

	  }
  }
  
  // TASKS API

  getTasks = (token) => {

  }  
  
  addTask = (task) => {
	  if(this.state.mode === "Add") {
		  let addObject = {
			  method:"POST",
			  mode:"cors",
			  headers:{"Content-Type":"application/json",
					   "token":this.props.token},
			  body:JSON.stringify(task)
		  }
		  fetch("/api/tasks",addObject).then((response) => {
			  if(response.ok) {
				  this.getTasks();
			  } else {
				  console.log("Server returned with status:"+response.status)
			  }
		  }).catch((error) => {
			  console.log(error);
		  })
	  } else {
		  console.log(task);
		  this.changeEditMode("Add");
		  this.props.history.push("/list");
		  let editObject = {
			  method:"POST",
			  mode:"cors",
			  headers:{"Content-Type":"application/json",
					   "token":this.props.token},
			  body:JSON.stringify(task)
		  }
		  fetch("/api/tasks/"+task._id,editObject).then((response) => {
			if(response.ok) {
				this.getTasks();
			} else {
				console.log("Server responded with status:"+response.status);				
			}
		  }).catch((error) => {
			  console.log(error);
		  })
	  }
  }
  
  removeTask = (id) => {
	  let deleteTask = {
		  method:"DELETE",
		  mode:"cors",
		  headers:{"Content-Type":"application/json",
				   "token":this.props.token}
	  }
	  fetch("/api/tasks/"+id,deleteTask).then((response) => {
		 if(response.ok) {
			 this.getTasks();
		 } else {
			 console.log("Server responded with status:"+response.status);
		 }
	  }).catch((error) => {
		  console.log(error);
	  })
  }
  
  changeEditMode = (mode,id) => {
		let task = {};
		if(id) {
			for(let i=0;i<this.state.list.length;i++) {
				if(id === this.state.list[i]._id) {
					task = this.state.list[i];
				}
			}
		}
		if(mode === "Edit") {
			this.props.history.push("/form");
		}
		this.setState({
			mode:mode,
			editTask:task
		})
  }
	
  render() {
    return (
      <div className="App">
			<NavBar mode={this.state.mode}
					changeEditMode={this.changeEditMode}/>
			<hr/>
			<Main isLogged={this.props.isLogged}
				  addTask={this.addTask}
				  removeTask={this.removeTask}
				  editTask={this.state.editTask}
				  mode={this.state.mode}
				  changeEditMode={this.changeEditMode}/>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
return {
	isLogged:state.login.isLogged,
	token:state.login.token,
	redirect:state.login.redirect
}
}

export default withRouter(connect(mapStateToProps)(App));
