<template>
  <div>
		<label>Enter new ToDo</label>
		<input type="text"
			   v-model="currentToDo" 
			   v-on:keyup.enter="addToList()"/>
		<hr></hr>
		<ul v-if="todoItems.length">
			<li v-for="(todo,index) in todoItems" :key="todo.id">
				{{todo.todo}}
				<button v-on:click="remove(index)">Do!</button>
			</li>
		</ul>
		<p v-else>
			Nothing to-do
		</p>
  </div>
</template>

<script>
export default {
  name: 'ToDoList',
  data: function() {
	return {
		todoItems: [
			{todo:"Do Laundry",id:0},
			{todo:"Code Vue",id:1}
		],
		currentId:2,
		currentToDo:""
	}
  },
  methods:{
	addToList:function() {
		this.todoItems.push({todo:this.currentToDo,id:this.currentId});
		this.currentId++;
		this.currentToDo=""
	},
	remove:function(index) {
		this.todoItems.splice(index,1);
	}
  }
}
</script>