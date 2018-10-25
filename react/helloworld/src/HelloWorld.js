import React from 'react';

export default class HelloWorld extends React.Component {
	
	constructor(props) {
		super(props);
		console.log(props);
	}
	
	render() {
		return (
			<h1>Hello {this.props.name}</h1>
		)
	}
}