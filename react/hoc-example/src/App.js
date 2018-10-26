import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Decorator from './Decorator'
import FirstButton from './FirstButton';
import SecondButton from './SecondButton';

class App extends Component {
  constructor(props) {
	  super(props);
	  this.state= {
		  message:""
	  }
  }
  
  callback = (message) => {
	  this.setState({
		  message:message
	  })
  }
  
  render() {
    return (
      <div className="App">
			<p>Button says: {this.state.message}</p>
			<MyButton callback={this.callback}
			color="red"/>
			<OtherButton callback={this.callback}
			color="blue"/>
      </div>
    );
  }
}

const MyButton = Decorator(FirstButton);
const OtherButton = Decorator(SecondButton);

export default App;
