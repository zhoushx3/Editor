<template lang="jade">
	#canvas
		.center-canvas(:style="{ transform: 'scale(' + scale + ')' }")
			template(v-for="element in content")
				component(:is="elementComponent($key)",
									:key="$key",
									:element="element")

</template>

<style lang="less" scoped>
	#canvas {
		position: absolute;
		top: 30px;
		bottom: 0;
		left: 300px;
		right: 300px;
		background-color: #aaa;
		overflow: auto;

		.center-canvas {
			position: absolute;
			top: 50%;
			left: 50%;
			width: 210px;
			height: 297px;
			margin-left: -105px;
			margin-top: -148.5px;
			background-color: #fff;
		}
	}
</style>

<script>
	import Text from './Text.vue'
	import Icon from './Icon.vue'
	import Img from './Img.vue'
	import Geometric from './Geometric.vue'

	export default {
		name: 'canvas-element',
		props: ['scale', 'content'],
		data() {
			return {
				_scale: 'scale(' + this.scale + ',' + this.scale + ')'
			}
		},
		computed: {
		},
		methods: {
			elementComponent(key) {
				return this.content[key].type + '-component'
			}
		},
		components: {
			'text-component': Text,
			'img-component': Img,
			'geometric-component': Geometric,
			'icon-component': Icon,
		},
		watch: {
			scale: function(value) {

			},
			content: function(value) {
				console.log(value)
			}
		},
		ready: function() {
		}
	}
</script>