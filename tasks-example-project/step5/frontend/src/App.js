import React, { Component } from 'react';
import NavBar from './components/NavBar';
import Main from './components/Main';
import logo from './logo.svg';
import {withRouter} from 'react-router-dom'; 
import './App.css';

class App extends Component {
  constructor(props) {
	  super(props);
	  this.state= {
		  list:[],
		  isLogged:false,
		  mode:"Add",
		  token:"",
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
			this.setState({
				isLogged:temp,
				token:token
			})
			if(temp === true) {
				this.getTasks(token);
				this.getUserList(token);
			}

	  }
  }
  
  setSessionStorage = (isLogged,token) => {
	  let temp;
	  if(isLogged) {
		  temp = "true"
	  } else {
		  temp = "false"
	  }
	  sessionStorage.setItem("isLogged",temp);
	  sessionStorage.setItem("token",token)
  }
  // LOGIN API
  register = (user) => {
	  let registerObject = {
		method:"POST",
		mode:"cors",
		headers:{"Content-Type":"application/json"},
		body:JSON.stringify(user)
	  }
	  fetch("/register", registerObject).then((response) => {
		if(response.ok) {
			alert("Register successful")
		}
		if(response.status === 409) {
			alert("Username already in use")
		}
	  }).catch((error) => {
			console.log(error);
	  })
  }
  
  login = (user) => {
	let loginObject= {
		method:"POST",
		mode:"cors",
		headers:{"Content-Type":"application/json"},
		body:JSON.stringify(user)
	}	
	fetch("/login",loginObject).then((response) => {
		if(response.ok) {
			response.json().then((data) => {
				this.setState({
					isLogged:true,
					token:data.token
				})
				this.setSessionStorage(true,data.token);
				this.getTasks();
				this.getUserList();
				//this.props.history.push("/list");
			}).catch((error) => {
				console.log(error)
			})			
		} else {
			alert("Wrong username or password")
		}	
	}).catch((error) => {
		console.log(error);
	})	
		
  }
  
  logout = () => {
		let logoutObject ={
			method:"POST",
			mode:"cors",
			headers:{"Content-Type":"application/json",
					 "token":this.state.token}
		}
		fetch("/logout", logoutObject).then((response) => {
			this.setState({
				isLogged:false,
				token:""
			})
			this.setSessionStorage(false,"");
		}).catch((error) => {
			console.log(error);
		})
  }
  
  
  getUserList = (token) => {
	  let tempToken;
	  if(token) {
		  tempToken = token
	  } else {
		  tempToken = this.state.token
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
		  tempToken = this.state.token;
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
					   "token":this.state.token},
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
					   "token":this.state.token},
			  body:JSON.stringify(task)
		  }
		  fetch("/api/tasks/"+task.id,editObject).then((response) => {
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
				   "token":this.state.token}
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
			let tempId = parseInt(id,10);
			for(let i=0;i<this.state.list.length;i++) {
				if(tempId === this.state.list[i].id) {
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
			<NavBar isLogged={this.state.isLogged}
					mode={this.state.mode}
					logout={this.logout}
					changeEditMode={this.changeEditMode}/>
			<hr/>
			<Main login={this.login}
				  register={this.register}
				  list={this.state.list}
				  isLogged={this.state.isLogged}
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

export default withRouter(App);
