import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MyForm from './MyForm';
import MyList from './MyList';
class App extends Component {
  
  constructor(props) {
	  super(props);
	  this.state = {
		  list:[],
		  id:100
	  }
  }
  
  addToList = (item) => {
	  item.id = this.state.id;
	  let tempId = this.state.id+1;
	  let tempList = []
	  for(let i=0;i<this.state.list.length;i++) {
		  tempList.push(this.state.list[i]);
	  }
	  tempList.push(item);
	  this.setState({
		  list:tempList,
		  id:tempId
	  })
	  console.log(tempList)
  }
  
  removeFromList= (id) => {
	  let tempId = parseInt(id,10);
	  let tempList = [];
	  for(let i=0;i<this.state.list.length;i++) {
		  if(this.state.list[i].id !== tempId) {
			  tempList.push(this.state.list[i])
		  }
	  }
	  this.setState({
		  list:tempList
	  })
  }
  
  render() {
    return (
      <div className="App">
			<MyForm addToList={this.addToList}/>
			<hr/>
			<MyList list={this.state.list}
					removeFromList={this.removeFromList}/>
      </div>
    );
  }
}

export default App;
