import React from 'react';
import {Button,Form} from 'semantic-ui-react';

export default class MyForm extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			type:"",
			id:0,
			count:0,
			price:0,
			isEdit:1
		}		
	}
	
	static getDerivedStateFromProps(newProps,prevState) {
		console.log("MyForm - getDerivedStateFromProps");
		if(newProps.mode === "Edit") {
			if(prevState.isEdit === 1) {
				return {
					id:newProps.item.id,
					type:newProps.item.type,
					count:newProps.item.count,
					price:newProps.item.price,
					isEdit:0
				}
			}
		}
		return null;
	}
	
	onChange = (e) => {
		if(e.target.name === "type") {
			this.setState({
				type:e.target.value
			})
		}
		if(e.target.name === "count") {
			this.setState({
				count:e.target.value
			})
		}
		if(e.target.name === "price") {
			this.setState({
				price:e.target.value
			})
		}		
	}
	
	submit = (e) => {
		e.preventDefault();
		let item = {
			id:this.state.id,
			count:this.state.count,
			type:this.state.type,
			price:this.state.price
		}
		this.props.addToList(item);
		this.setState({
			id:0,
			type:"",
			price:0,
			count:0,
			isEdit:1
		})
	}
	
	render() {
		return(
			<Form onSubmit={this.submit}>
				<Form.Field>
					<label>Type</label>
					<input type="text"
						   name="type"
						   value={this.state.type}
						   onChange={this.onChange}/>
				</Form.Field>
				<Form.Field>
					<label>Count</label>
					<input type="number"
						   name="count"
						   min="0"
						   value={this.state.count}
						   onChange={this.onChange}/>
				</Form.Field>
				<Form.Field>
					<label>Price</label>
					<input type="number"
						   name="price"
						   min="0"
						   step="0.01"
						   value={this.state.price}
						   onChange={this.onChange}/>
				</Form.Field>
				<Button type="submit">{this.props.mode}</Button>
			</Form>
		)
		
	}
	
}