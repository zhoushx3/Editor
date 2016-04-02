<template lang="jade">
	wrapper(:element="element", :key="key", :selectid="selectid") 
		p {{ element.text }}
</template>

<style lang="less">
	.text {

	}
</style>

<script>
	import Wrapper from '../Wrapper.vue'

	export default {
		name: 'text-component',
		props: ['key', 'element', 'selectid'],
		data() {
			return {
			}
		},
		computed: {
		},
		watch: {
		},
		components: {
			'wrapper': Wrapper,
		},
		ready: function() {
			console.log('text is ready')
		}
	}
</script>