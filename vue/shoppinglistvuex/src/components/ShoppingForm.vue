<template>
<div>
	<label for="itemtype">Item Type:</label>
	<input type="text" v-model="item.itemtype" name="itemtype"/>
	<label for="price">Price:</label>
	<input type="number" name="price" minimum="0" step="0.01" v-model="item.price"/>
	<label for="count">Count:</label>
	<input type="number" minimum="0" step="1" v-model="item.count" name="count"/>
	<br/>
	<button v-on:click="addToList()">Add</button>
</div>
</template>
<script>
export default {
	name:"ShoppingForm",
	data: function() {
		return {
			item:{
				id:0,
				itemtype:"",
				price:0,
				count:0
			}
		}
	},
	methods: {
		addToList:function() {
			this.$store.dispatch("addToList", this.item);
			this.item = {
				id:0,
				itemtype:"",
				price:0,
				count:0
			}
		}
	}
}

</script>