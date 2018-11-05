import React from 'react';
import {Link} from 'react-router-dom';

export default class NavBar extends React.Component {

	render() {
		return (
			<ul>
				<li><Link to="/">List</Link></li>
				<li><Link to="/form">Add</Link></li>
			</ul>
		)
	}

}