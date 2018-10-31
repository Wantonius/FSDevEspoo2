import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import LoginForm from './LoginForm';
import TasksList from './TasksList';
import TasksForm from './TasksForm';

export default class Main extends React.Component {

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
					(<LoginForm register={this.props.register}
								   login={this.props.login}/>)
				)}/>
				<Route path="/list" render={() => (
				this.props.isLogged ?
					(<TasksList	list={this.props.list}
					 removeTask={this.props.removeTask}
					 changeEditMode={this.props.changeEditMode}/>):
					(<Redirect to="/"/>)
				)}/>
				<Route path="/form" render={() => (
				this.props.isLogged ?
					(<TasksForm userlist={this.props.userlist}
					  addTask={this.props.addTask}	
					  mode={this.props.mode}
					  editTask={this.props.editTask}
					  changeEditMode={this.props.changeEditMode}
					/>):
					(<Redirect to="/"/>)
				)}/>
			</Switch>
		)
	}
}