import React from 'react';
import {Link} from 'react-router-dom';
import {List, Header} from 'semantic-ui-react';

export default class NavBar extends React.Component {

	render() {
		return(
			<div>
				<Header>ShoppingList App</Header>
				<List>
					<List.Item><Link to="/">List</Link></List.Item>
					<List.Item><Link to="/form">Add Item</Link></List.Item>
				</List>
			</div>
		)
	}
}