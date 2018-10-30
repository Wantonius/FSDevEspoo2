import React from 'react';
import {Table, Button} from 'semantic-ui-react'

export default class TasksList extends React.Component {
	
	remove = (event) => {
		this.props.removeTask(event.target.name);
	}
	
	render() {	
		let tasks = this.props.list.map((item) => {
			return <Table.Row key={item.id}>
				<Table.Cell>{item.name}</Table.Cell>
				<Table.Cell>{item.creator}</Table.Cell>
				<Table.Cell>{item.assigned}</Table.Cell>
				<Table.Cell>{item.state}</Table.Cell>
				<Table.Cell>{item.startdate}</Table.Cell>
				<Table.Cell>{item.enddate}</Table.Cell>
				<Table.Cell><Button onClick={this.remove}
									name={item.id}>Remove</Button></Table.Cell>
			</Table.Row>
		})
		return(
			<Table celled>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Task</Table.HeaderCell>
						<Table.HeaderCell>Created By</Table.HeaderCell>
						<Table.HeaderCell>Assigned</Table.HeaderCell>
						<Table.HeaderCell>State</Table.HeaderCell>
						<Table.HeaderCell>Started</Table.HeaderCell>
						<Table.HeaderCell>Ends</Table.HeaderCell>
						<Table.HeaderCell>Remove</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{tasks}
				</Table.Body>
			</Table>
		)
	
	}

}