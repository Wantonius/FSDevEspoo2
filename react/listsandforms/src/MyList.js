import React from 'react';                              
import {Table,Button} from 'semantic-ui-react';

export default class MyList extends React.Component {

	removeItem = (e) => {
		this.props.removeFromList(e.target.name);
	}

	render() {
		let tableItems = this.props.list.map((item) => 
			<Table.Row key={item.id}>
				<Table.Cell>{item.count}</Table.Cell>
				<Table.Cell>{item.type}</Table.Cell>
				<Table.Cell>{item.price}</Table.Cell>
				<Table.Cell><Button 
				name={item.id}
				onClick={this.removeItem}>Remove</Button></Table.Cell>
			</Table.Row>
		)
		return(
			<Table celled>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Count</Table.HeaderCell>
						<Table.HeaderCell>Type</Table.HeaderCell>
						<Table.HeaderCell>Price</Table.HeaderCell>
						<Table.HeaderCell>Remove</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{tableItems}
				</Table.Body>
			</Table>
		)
	}
}