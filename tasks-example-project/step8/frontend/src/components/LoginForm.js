import React from 'react';
import {Form,Button} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {onLogin, onRegister} from '../actions/loginActions';

class LoginForm extends React.Component {

	constructor(props) {
		super(props);
		this.state= {
			username:"",
			password:""
		}
	}
	
	onChange = (event) => {
		if(event.target.name === "username") {
			this.setState({
				username:event.target.value
			})
		}
		if(event.target.name === "password") {
			this.setState({
				password:event.target.value
			})
		}
	}
	
	onSubmit = (event) => {
		event.preventDefault();
		let user = {
			username:this.state.username,
			password:this.state.password
		}
		if(event.target.name === "register") {
			console.log("LoginForm onSubmit register")
			this.props.dispatch(onRegister(user));
		} else {
			console.log("LoginForm onSubmit login");
			this.props.dispatch(onLogin(user));
		}
		this.setState({
			username:"",
			password:""
		})
	}

	render() {
		return (
			<Form>
				<Form.Field>
					<label>Username</label>
					<input type="text"
						   name="username"
						   value={this.state.username}
						   onChange={this.onChange}/>
				</Form.Field>
				<Form.Field>
					<label>Password</label>
					<input type="password"
						   name="password"
						   value={this.state.password}
						   onChange={this.onChange}/>
				</Form.Field>
				<Button onClick={this.onSubmit}
						name="register">Register</Button>
				<Button onClick={this.onSubmit}
						name="login">Login</Button>
			</Form>
		)
	}
	
}

export default connect()(LoginForm);