<template>
  <div class="hello">
		<h1>{{msg}}:{{childmessage}}</h1>
		<CustomEvent @my-custom-event="customEventHandler(...arguments)"/>
  </div>
</template>

<script>
import CustomEvent from './CustomEvent';

export default {
  name: 'HelloWorld',
  data: function() {
	return {
		msg:"Child component says",
		childmessage:"No message yet"
	}
  },
  methods: {
	customEventHandler: function(data) {
		this.childmessage=data;
	}
  },
  components:{CustomEvent}
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
