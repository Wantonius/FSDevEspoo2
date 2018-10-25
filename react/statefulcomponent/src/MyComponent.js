import React from 'react'

export default class MyComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			color:"red"
		}
	}
	
	changeColor = (event) => {
		this.setState({
			color:event.target.value
		})	
	}

	render() {
		let style = {backgroundColor:this.state.color}
		return (
			<div>
				<p style={style}>This has the color</p> 
				<input type="text"
					   name="colorchange"
					   value={this.state.color}
					   onChange={this.changeColor}/>
			</div>
		)
	}

}