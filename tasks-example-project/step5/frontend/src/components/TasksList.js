import React from 'react';
import {Table, Button} from 'semantic-ui-react'

export default class TasksList extends React.Component {

	edit = (event) => {
		this.props.changeEditMode("Edit",event.target.id);
	}
	
	remove = (event) => {
		this.props.removeTask(event.target.name);
	}
	
	render() {	
		let assigned = [];
		for(let i=0;i<this.props.list.length;i++) {
			let temp = ""
			for(let j=0;j<this.props.list[i].assigned.length;j++) {
				temp = temp + this.props.list[i].assigned[j]+" "
			}
			if(temp.length < 1) {
				temp = "Not assigned"
			}
			assigned.push(temp)
		}
		let tasks = this.props.list.map((item,index) => {			
			return <Table.Row key={item.id}>
				<Table.Cell>{item.name}</Table.Cell>
				<Table.Cell>{item.creator}</Table.Cell>
				<Table.Cell>{assigned[index]}</Table.Cell>
				<Table.Cell>{item.state}</Table.Cell>
				<Table.Cell>{item.startdate}</Table.Cell>
				<Table.Cell>{item.enddate}</Table.Cell>
				<Table.Cell><Button onClick={this.remove}
									name={item.id}>Remove</Button></Table.Cell>
				<Table.Cell><Button onClick={this.edit}
									id={item.id}>Edit</Button></Table.Cell>
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
						<Table.HeaderCell>Edit</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{tasks}
				</Table.Body>
			</Table>
		)
	
	}

}