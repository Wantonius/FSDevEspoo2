<template>
  <div class="hello">
  <h1>Hello World</h1>
    <h1>{{ msg }}</h1>
	<h1> Hello, {{firstName}} </h1>
	<h1> {{helloMessage}}</h1>
	<h1> {{helloMethod()}}</h1>
  </div>
</template>

<script>
export default {
  name: 'MyFirstComponent',
  props: ['firstName'],
  data() {
	return {
		msg:"Hello World"
	}
  },
  computed: {
	helloMessage: function(){
		return "Hello again, "+this.firstName;
	}
  },
  methods: {
	helloMethod: function() {
		return "Hello from method, "+this.firstName;
	}
  }
}
</script>