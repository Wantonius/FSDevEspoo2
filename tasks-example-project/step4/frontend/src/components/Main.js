import React from 'react';
import {Switch,Route} from 'react-router-dom';
import LoginForm from './LoginForm';

export default class Main extends React.Component {

	render() {
		return (
			<Switch>
				<Route exact path="/" render={()=> 
					<LoginForm register={this.props.register}
							   login={this.props.login}/>
				}/>
			</Switch>
		)
	}
}