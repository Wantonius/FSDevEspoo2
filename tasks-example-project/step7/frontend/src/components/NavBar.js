import React from 'react';
import {List} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {onLogout} from '../actions/loginActions';

class NavBar extends React.Component {

	logout = () => {
		this.props.dispatch(onLogout(this.props.token));
	}
	
	saveToStorage = (event) => {
		let target = "/"+event.target.name
		sessionStorage.setItem("target",target);
		if(this.props.mode === "Edit") {
			this.props.changeEditMode("Add");
		}
	}
	
	render() {
		let navbar;
		if(this.props.isLogged) {
			navbar  = <List>
						<List.Item><Link name="list" 
						to="/list"
						onClick={this.saveToStorage}
						>Tasks</Link></List.Item>
						<List.Item><Link name="form" 
						to="/form"
						onClick={this.saveToStorage}
						>{this.props.mode} Tasks</Link></List.Item>
						<List.Item><Link to="/" onClick={this.logout}>Logout</Link></List.Item>
					</List>
		} else {
			navbar = <div style={{height:65}}></div>
		}
		return(
			<div>
				{navbar}
			</div>
		)
	}	

}

const mapStateToProps = (state) => {
	return {
		isLogged:state.isLogged,
		token:state.token
	}
}

export default connect(mapStateToProps)(NavBar);