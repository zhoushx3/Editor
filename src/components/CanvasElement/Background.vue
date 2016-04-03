<template lang="jade">
	wrapper(:element="element", :key="key", :selectid="selectid") 
</template>

<style lang="less">
</style>

<script>
	import Wrapper from '../Wrapper.vue'

	export default {
		name: 'background-component',
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
		}
	}
</script>