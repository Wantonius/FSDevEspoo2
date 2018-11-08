import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import LoginForm from './LoginForm';
import TasksList from './TasksList';
import TasksForm from './TasksForm';

class Main extends React.Component {

	render() {
		let target="/list";
		if(sessionStorage.getItem("target")) {
			target = sessionStorage.getItem("target")
		}
		return (
			<Switch>
				<Route exact path="/" render={()=> (
					this.props.isLogged ? 
					(<Redirect to={target}/>) :
					(<LoginForm />)
				)}/>
				<Route path="/list" render={() => (
				this.props.isLogged ?
					(<TasksList	/>):
					(<Redirect to="/"/>)
				)}/>
				<Route path="/form" render={() => (
				this.props.isLogged ?
					(<TasksForm />):
					(<Redirect to="/"/>)
				)}/>
			</Switch>
		)
	}
}

export default Main;