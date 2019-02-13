<template>
	<table>
		<thead>
			<tr>
				<th>Count</th>
				<th>Type</th>
				<th>Price</th>
				<th>Buy</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(item,index) in this.$store.state.shoppingList" :key="item.id">
				<td>{{item.count}}</td>
				<td>{{item.itemtype}}</td>
				<td>{{item.price}}</td>
				<td><button v-on:click="remove(index)">Buy</button></td>
			</tr>
		</tbody>
	</table>
</template>
<script>
export default {
	name:"ShoppingList",
	methods:{
		remove:function(index) {
			this.$store.dispatch('removeFromList',index);
		}
	}
}
</script>