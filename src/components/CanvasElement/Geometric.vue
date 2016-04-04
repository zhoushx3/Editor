<template lang="jade">
	wrapper(:element="element", :key="key", :selectid="selectid") 
		.shapeWrapper
			div(:class="element.className", :style="size")
</template>

<style lang="less" scoped>
	.shapeWrapper {
		// width: 40px;
		// height: 40px;
	}
</style>
	
<script>
	import Wrapper from '../Wrapper.vue'

	export default {
		name: 'geometric-component',
		props: ['key', 'element', 'selectid'],
		data() {
			return {
			}
		},
		computed: {
			option() {
				return this.element.option
			},
			size() {
				let width = this.option.width || '20px'
				return  {
					height: width,
					width: width,
					'background-color': '#D871FF'
				}
			}
		},
		watch: {
		},
		methods: {
		},
		components: {
			'wrapper': Wrapper,
		},
		ready: function() {
		}
	}
</script>