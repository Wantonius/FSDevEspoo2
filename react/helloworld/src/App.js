import React, { Component } from 'react';
import HelloWorld from './HelloWorld';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
			<h1>Hello World</h1>
			<HelloWorld name="Erno"/>
			<HelloWorld name="Jaska"/>
      </div>
    );
  }
}

export default App;
