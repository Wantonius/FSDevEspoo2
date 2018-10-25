import React from 'react'

export default class Label extends React.Component {

	click = () => {
		this.props.changeColor();
	}
	
	render() {
		let labelStyle = {
			fontFamily: "sans-serif",
			fontWeight: "bold",
			padding:13,
			margin:0
		}
		return(
			<p style={labelStyle}
			   onClick={this.click}
			>{this.props.color}</p>
		)
	}
}