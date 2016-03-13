<template lang="jade">
	wrapper(:style="element.style", :key="key", :type="element.type")
		.shapeWrapper
			div(:class="element.className")
</template>

<style lang="less" scoped>
	.shapeWrapper {
		width: 40px;
		height: 40px;
	}
</style>
	
<script>
	import Wrapper from '../Wrapper.vue'

	export default {
		name: 'geometric-component',
		props: ['key', 'element'],
		data() {
			return {
			}
		},
		computed: {
		},
		watch: {
		},
		methods: {
		},
		components: {
			'wrapper': Wrapper,
		},
		ready: function() {
			console.log('geometric is ready')

		}
	}
</script>