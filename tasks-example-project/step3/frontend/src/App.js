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
  
  register = (user) => {
	  console.log("register")
	  console.log(user)
  }
  
  login = (user) => {
	  this.setState({
		  isLogged:true
	  })
  }
  
  logout = () => {
	  this.setState({
		  isLogged:false
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
