import React, { Component } from 'react';
import NavBar from './components/NavBar';
import Main from './components/Main';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
	  super(props);
	  this.state= {
		  list:[],
		  isLogged:false,
		  mode:"Add",
		  token:""
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
	
  render() {
    return (
      <div className="App">
			<NavBar isLogged={this.state.isLogged}
					mode={this.state.mode}
					logout={this.logout}/>
			<hr/>
			<Main login={this.login}
				  register={this.register}/>
      </div>
    );
  }
}

export default App;
