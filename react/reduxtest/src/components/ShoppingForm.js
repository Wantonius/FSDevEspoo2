import React from 'react';
import {connect} from 'react-redux';

class ShoppingForm extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			type:"",
			count:0,
			price:0
		}
	}
	
	onChange = (event) => {
		let state = {}
		state[event.target.name]=event.target.value
 		this.setState(state);
	}
	
	onSubmit = (event) => {
		event.preventDefault();
		let tempObject = {
			type:this.state.type,
			count:this.state.count,
			price:this.state.price
		}
		console.log("ShoppingForm - Calling dispatch add to list");
		this.props.dispatch({
			type:"ADD_TO_LIST",
			data:tempObject
		})
		this.setState({
			type:"",
			count:0,
			price:0
		})
	}

	render(){
		return (
			<form onSubmit={this.onSubmit}>
				<label htmlFor="type">Type</label>
				<input type="text"
					   name="type"
					   onChange={this.onChange}
					   value={this.state.type}/>
				<label htmlFor="count">Count</label>
				<input type="number"
					   name="count"
					   onChange={this.onChange}
					   value={this.state.count}/>
				<label htmlFor="price">Price</label>
				<input type="number"
					   name="price"
					   onChange={this.onChange}
					   value={this.state.price}/>	
				<input type="submit" value="Add"/>
			</form>
		)
	}
}

export default connect()(ShoppingForm);