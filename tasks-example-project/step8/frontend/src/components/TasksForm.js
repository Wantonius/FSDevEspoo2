import React from 'react';
import {Form,Button,Dropdown} from 'semantic-ui-react';
import {connect} from 'react-redux';

class TasksForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			id:0,
			name:"",
			description:"",
			assigned:[],
			taskstate:"",
			start:0,
			end:0,
			onEdit:1
		}
	}
	
	static getDerivedStateFromProps(newProps,prevState) {
		if(newProps.mode === "Edit") {
			if(prevState.onEdit === 1) {
				console.log(newProps);
				return {
					id:newProps.editTask._id,
					name:newProps.editTask.name,
					description:newProps.editTask.description,
					assigned:newProps.editTask.assigned,
					taskstate:newProps.editTask.state,
					start:newProps.editTask.startdate,
					end:newProps.editTask.enddate,
					onEdit:0
				}
			}
		}
		return null;
	}
	
	onChange = (event) => {
		let state = {}
		state[event.target.name]=event.target.value
 		this.setState(state);
	}
	
	handleSelect = (event,data) => {
		let state = {};
		state[data.name] = data.value;
		this.setState(state);
	}
	
	submit =(event) => {
		event.preventDefault();
		if(this.state.name.length === 0) {
			return;
		}
		let task = {
			"_id":this.state.id,
			"name":this.state.name,
			"description":this.state.description,
			"state":this.state.taskstate,
			"assigned":this.state.assigned,
			"startdate":this.state.start,
			"enddate":this.state.end
		}
		this.props.addTask(task);
		this.setState({
			name:"",
			description:"",
			assigned:[],
			taskstate:"",
			start:0,
			end:0,
			onEdit:1
		})	
	}
	
	render() {
		let task_states=[
		{"text":"created",
		"value":"created"},
		{"text":"assigned",
	     "value":"assigned"},
		{"text":"in progress",
		"value":"in progress"},
		{"text":"done",
		"value":"done"},
		{"text":"reopened",
		"value":"reopened"}];	
		let users = [];
		for(let i=0;i<this.props.userlist.length;i++) {
			users.push({
				"key":this.props.userlist[i],
				"text":this.props.userlist[i],
				"value":this.props.userlist[i],
			})
		}
		return (
			<Form id="tasks_form">
				<Form.Field >
					<label>Task name</label>
					<input type="text"
						   name="name"
						   onChange={this.onChange}
						   value={this.state.name}/>
				</Form.Field>
				<Form.Field>
					<label>Description</label>
					<textarea name="description"
							  onChange={this.onChange}
							  value={this.state.description}
							  form="tasks_form"/>
				</Form.Field>
				<Form.Field>
					<label>Task State</label>
					<Dropdown placeholder="Select state"
							  onChange={this.handleSelect}
							  name="taskstate"
							  fluid selection
							  options={task_states}
							  value={this.state.taskstate}/>
				</Form.Field>
				<Form.Field>
					<label>Assign to</label>
					<Dropdown placeholder="Select users"
							  onChange={this.handleSelect}
							  name="assigned"
							  fluid selection multiple
							  options={users}
							  value={this.state.assigned}/>
				</Form.Field>
				<Form.Field>
					<label>Start date</label>
					<input type="date"
						   onChange={this.onChange}
						   name="start"
						   value={this.state.start}/>
				</Form.Field>
				<Form.Field>
					<label>End date</label>
					<input type="date"
						   onChange={this.onChange}
						   name="end"
						   value={this.state.end}/>
				</Form.Field>
				<Button type="submit" onClick={this.submit}>{this.props.mode}</Button>
			</Form>
		)
		
	}
}

const mapStateToProps = (state) => {
	return {
		userlist: state.tasks.userlist
	}
}

export default connect(mapStateToProps)(TasksForm);