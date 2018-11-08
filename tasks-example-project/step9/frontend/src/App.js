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
		this.state = {}
	}
  
  static getDerivedStateFromProps(newProps,prevState) {
	  if(newProps.redirect) {
		  newProps.dispatch(getUserlist(newProps.token));
		  newProps.dispatch(getTasks(newProps.token,true))
		  newProps.dispatch(loginRedirect());
	  }
	  return null;	
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
				this.props.dispatch(getTasks(token,true));
				this.props.dispatch(getUserlist(token))
			}
	  }
  }
  


	
  render() {
    return (
      <div className="App">
			<NavBar/>
			<hr/>
			<Main isLogged={this.props.isLogged}/>
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
