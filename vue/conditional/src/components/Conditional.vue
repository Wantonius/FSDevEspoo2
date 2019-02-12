<template>
<div>
	<div v-if="isLogged">
		<button v-on:click="logout()">Logout</button>
	</div>
	<div v-else>
		<button v-on:click="login()">Login</button>	
	</div>
	<p v-show="isLogged">
		You have logged in!
	</p>
</div>
</template>

<script>
export default {
  name: 'Conditional',
  data: function() {
	return {
		isLogged:false
	}
  },
  methods: {
	login: function() {
		this.isLogged=true;
	},
	logout: function() {
		this.isLogged=false;
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
