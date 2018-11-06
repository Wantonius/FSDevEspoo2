import React from 'react';
import {Table, Button} from 'semantic-ui-react'
import {connect} from 'react-redux';
import {removeTask, changeEditMode} from '../actions/taskActions';
import {withRouter} from 'react-router-dom';

class TasksList extends React.Component {

	edit = (event) => {
		console.log("TasksList - edit")
		let tempId = event.target.id;
		for(let i=0;i<this.props.list.length;i++) {
			if(tempId === this.props.list[i]._id) {
				console.log("tempID found")
				let editTask = this.props.list[i];
				this.props.dispatch(changeEditMode("Edit",editTask));
				this.props.history.push("/form");
			}
		}

	}
	
	remove = (event) => {
		this.props.dispatch(removeTask(this.props.token,event.target.name));
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
			return <Table.Row key={item._id}>
				<Table.Cell>{item.name}</Table.Cell>
				<Table.Cell>{item.creator}</Table.Cell>
				<Table.Cell>{assigned[index]}</Table.Cell>
				<Table.Cell>{item.state}</Table.Cell>
				<Table.Cell>{item.startdate}</Table.Cell>
				<Table.Cell>{item.enddate}</Table.Cell>
				<Table.Cell><Button onClick={this.remove}
									name={item._id}>Remove</Button></Table.Cell>
				<Table.Cell><Button onClick={this.edit}
									id={item._id}>Edit</Button></Table.Cell>
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

const mapStateToProps = (state) => {
	return {
		list:state.tasks.list,
		token:state.login.token
	}
}

export default withRouter(connect(mapStateToProps)(TasksList));	