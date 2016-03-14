<template lang="jade">
	.controller
		template(v-if="!selectElement")
			h2 点击画布上的元素
		template(v-else)

</template>

<style lang="less">
	.controller {
		position: absolute;
		top: 30px;
		bottom: 0;
		right: 0;
		width: 300px;
		border-left: 1px solid #000;
		display: flex;
		justify-content: center;
		align-content: center;
		align-items: center;

	}
</style>


<script>
	import Font from './font.vue'
	import Color from './Color.vue'

	export default {
		name: 'color-controller',
		props: [''],
		components: {
			'font': Font,
			'color': Color,
		}
	}

</script>