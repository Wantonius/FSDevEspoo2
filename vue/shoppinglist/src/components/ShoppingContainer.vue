<template>
  <div class="hello">
		<ShoppingForm @add-to-list="addToList(...arguments)"/>
		<ShoppingList v-bind:list="shoppingList" @remove-item="removeItem(...arguments)"/>
  </div>
</template>

<script>
import ShoppingForm from './ShoppingForm';
import ShoppingList from './ShoppingList';
export default {
  name: 'ShoppingContainer',
  components: {
	ShoppingForm,
	ShoppingList
  },
  data: function() {
	return {
		shoppingList:[],
		id:0
	}
  },
  methods: {
	addToList:function(data) {
		console.log("addToList - shoppingContainer");
		data.id = this.id;
		this.id++;
		this.shoppingList.push(data);
	},
	removeItem:function(index) {
		this.shoppingList.splice(index,1);
	}
  }  	
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
