<template>
  <div class="hello">
		<router-link to="/">List</router-link><br/>
		<router-link to="/form">Add new</router-link>
		<router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'ShoppingContainer',
  mounted: function() {
	this.$store.dispatch("getList");
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
