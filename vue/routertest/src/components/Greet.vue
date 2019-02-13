<template>
  <div class="hello">
    <h1>{{ msg }}, {{$route.params.person}}</h1>
	<button v-on:click="backHome()">Back</button>
  </div>
</template>

<script>
export default {
  name: 'Greet',
  data () {
    return {
      msg: 'Hello'
    }
  },
  methods: {
	backHome:function() {
		//this.$router.push({path:"/"});
		this.$router.go(-1);
	}
  }
}
</script>