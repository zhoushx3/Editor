<template lang="jade">
	wrapper(:style="element.style", :key="key") 
		img(:src="element.src", :alt="element.alt")
</template>

<style lang="less" scoped>
	img {
		width: 100%;
		height: 100%;
	}
</style>

<script>
	import Wrapper from '../Wrapper.vue'

	export default {
		name: 'img-component',
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
			console.log('img is ready')

		}
	}
</script>