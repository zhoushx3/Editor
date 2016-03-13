<template lang="jade">
	.controller
		h2 hello
</template>

<style lang="less">
	.controller {
		position: absolute;
		top: 30px;
		bottom: 0;
		right: 0;
		width: 300px;
		border-left: 1px solid #000;

		h2 {
			color: #f00
		}
	}
</style>


<script>
	export default {
		name: 'controller'
	}

</script>