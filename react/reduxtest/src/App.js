import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from "./components/NavBar";
import ShoppingList from "./components/ShoppingList";
import ShoppingForm from "./components/ShoppingForm";
import {Switch,Route} from "react-router-dom"

class App extends Component {
  render() {
    return (
      <div className="App">
		<NavBar/>
		<hr/>
		<Switch>
			<Route exact path="/" render={() => 
				<ShoppingList />			
			}/>
			<Route path="/form" render={() =>
				<ShoppingForm />
			}/>
		</Switch>
      </div>
    );
  }
}

export default App;
