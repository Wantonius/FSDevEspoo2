import React from 'react';

const Decorator = (WrappedComponent) => {
	return class extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				color:""
			}
		}
	
		update = (event) => {
			this.setState({
				color:event.target.value
			})
		}
		
		render() {
			return (
				<div>
					<WrappedComponent {...this.props}
					color={this.state.color}/>
					<input type="text"
						   name="colorpicker"
						   value={this.state.color}
						   onChange={this.update}/>
				</div>
			)			
		}	
	}
}

export default Decorator;