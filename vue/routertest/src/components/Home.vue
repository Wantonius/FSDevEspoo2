<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
	<p>Please enter name of person to greet:</p>
	<input type="text" v-model="person_name"/>
	<button v-on:click="greetPerson()">Greet</button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
	  msg: 'This is the Home of Vue router test',
	  person_name: ""
	}
	},
  methods: {
	greetPerson: function() {
		let person = {"person":this.person_name};	
		this.$router.push({name:"Greet", params:person});
	}
  }
}
</script>