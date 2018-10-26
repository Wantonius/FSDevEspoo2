import React from 'react'

export default class SecondButton extends React.Component {

	callback = (event) => {
		this.props.callback("Second Button here!")
	}

	render() {
		let buttonStyle = {
			backgroundColor:this.props.color
		}
		return(
			<button style={buttonStyle}
					onClick={this.callback}>Less than awesome</button>
		)
	}
}