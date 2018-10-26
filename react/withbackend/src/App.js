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
		  mode:"Add",
		  editItem:{}
	  }
  }
  
  componentDidMount() {
	  this.getShoppingList();
  }
  
  getShoppingList = () => {
	  let getObject = {
		  method:"GET",
		  mode:"cors",
		  headers:{"Content-Type":"application/json"}
	  }
	  fetch("/api/shopping", getObject).then((response) => {
		  if(response.ok) {
			  response.json().then((data) => {
				  this.setState({
					  list:data
				  })
			  }).catch((err) => {
				  console.log(err);
			  })
		  } else {
			  console.log("Response not 200 OK:"+response.status);
		  }
	  }).catch((err) => {
		  console.log(err);
	  });
  }
  
  addToList = (item) => {
	if(this.state.mode === "Add") {
	  let postObject = {
		  method:"POST",
		  mode:"cors",
		  headers:{"Content-Type":"application/json"},
		  body:JSON.stringify(item)
	  }
	  fetch("/api/shopping",postObject).then((response) => {
		  if(response.ok) {
			  this.getShoppingList();
		  } else {
			  console.log("Response not 200 OK:"+response.status)
		  }
	  }).catch((err) => {
		  console.log(err)
	  })
    }
	else {
	  this.setState({
				mode:"Add",
				editItem:{}
	  })
	  let editObject = {
		  method: "POST",
		  mode:"cors",
		  headers:{"Content-Type":"application/json"},
		  body: JSON.stringify(item)
	  }
	  fetch("/api/shopping/"+item.id,editObject).then((response) => {			  
		  if(response.ok) {
			  this.getShoppingList();
		  } else {
			  console.log("Response not 200 OK:"+response.status)
		  }
	  }).catch((err) => {
		  console.log(err);
	  })
		
  }
} 
  toEditMode = (id) => {
	  let tempItem = {}
	  let tempId = parseInt(id,10);
	  for(let i=0;i<this.state.list.length;i++) {
		  if(tempId === this.state.list[i].id) {
			  tempItem = this.state.list[i]
		  }
	  }
	  this.setState({
		  mode:"Edit",
		  editItem:tempItem
	  })
  }
  
  removeFromList= (id) => {
	let deleteObject = {
		method:"DELETE",
		mode:"cors",
		headers:{"Content-Type":"application/json"}
	}
	fetch("/api/shopping/"+id,deleteObject).then((response) => {
		if(response.ok) {
			this.getShoppingList();
		} else {
			console.log("Response not 200 ok:"+response.status)
		}
	}).catch((err) => {
		console.log(err);
	})
  /*	  let tempId = parseInt(id,10);
	  let tempList = [];
	  for(let i=0;i<this.state.list.length;i++) {
		  if(this.state.list[i].id !== tempId) {
			  tempList.push(this.state.list[i])
		  }
	  }
	  this.setState({
		  list:tempList
	  })*/
  }
  
  render() {
    return (
      <div className="App">
			<MyForm addToList={this.addToList}
			        mode={this.state.mode}
					item={this.state.editItem}/>
			<hr/>
			<MyList list={this.state.list}
					removeFromList={this.removeFromList}
					toEditMode={this.toEditMode}/>
      </div>
    );
  }
}

export default App;
