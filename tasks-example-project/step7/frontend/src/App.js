import React, { Component } from 'react';
import NavBar from './components/NavBar';
import Main from './components/Main';
import logo from './logo.svg';
import {withRouter} from 'react-router-dom'; 
import {connect} from 'react-redux';
import './App.css';

class App extends Component {
  constructor(props) {
	  super(props);
	  this.state= {
		  list:[],
		  mode:"Add",
		  userlist:[],
		  editTask:{}
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
				this.getTasks(token);
				this.getUserList(token);
			}

	  }
  }
  


  
  getUserList = (token) => {
	  let tempToken;
	  if(token) {
		  tempToken = token
	  } else {
		  tempToken = this.props.token
	  }
	  let userObject = {
		  method:"GET",
		  mode:"cors",
		  headers:{"Content-Type":"application/json",
		           "token":tempToken}
	  }
	  fetch("/users", userObject).then((response) => {
		 if(response.ok) {
			 response.json().then((data) => {
				 this.setState({
					 userlist:data
				 })
			 }).catch((error) => {
				 console.log(error)
			 });
		 } 
	  }).catch((error) => {
		 console.log(error); 
	  });
  }
  
  // TASKS API

  getTasks = (token) => {
	  let tempToken;
	  if(token) {
		  tempToken = token;
	  } else {
		  tempToken = this.props.token;
	  }
	  let fetchObject = {
		  method:"GET",
		  mode:"cors",
		  headers:{
			  "Content-Type":"application/json",
			  "token":tempToken
		  }		  
	  }
	  fetch("/api/tasks",fetchObject).then((response) => {
		  if(response.ok) {
			  response.json().then((data) => {
				  this.setState({
					  list:data
				  })
			  }).catch((error) => {
				  console.log(error)
			  })
		  } else {
			  console.log("Server responded with status:"+response.status)
		  }
	  }).catch((error) => {
			console.log(error)
	  });
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
			<Main list={this.state.list}
				  isLogged={this.props.isLogged}
				  userlist={this.state.userlist}
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
	isLogged:state.isLogged,
	token:state.token
}
}

export default withRouter(connect(mapStateToProps)(App));
