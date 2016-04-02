<template lang="jade">
	wrapper(:element="element", :key="key", :selectId="selectId") 
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
		props: ['key', 'element', 'selectId'],
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