<template>
	<div>
		<label for="messageinput">Enter event message</label>
		<input type="text" name="messageinput" v-model="message"/>
		<button v-on:click="sendMessage()">Send</button>
	</div>
</template>
<script>
	export default {
	name:"CustomEvent",
	data: function() {
		return {
			message:""
		}
	},
	methods: {
		sendMessage:function() {
			this.$emit("my-custom-event", this.message);
		}
	}
}
</script>