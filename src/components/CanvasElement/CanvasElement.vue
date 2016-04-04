<template lang="jade">
	#canvas
		#center-canvas(:style="style")
			template(v-for="element in content")
				component(:is="elementComponent($key)",
									:key="$key",
									:selectid="selectid",
									:element="element")

</template>

<style lang="less" scoped>
	@import '../../less/variable.less';

	#canvas {
		position: absolute;
		top: 30px;
		bottom: 0;
		left: 0;
		right: 300px;
		background-color: #fff;
		overflow: hidden;
		display: flex;
		justify-content: center;

		#center-canvas {
			position: relative;
			// max-width: @canvas-width;
			margin-top: 30px;
			margin-bottom: 30px;
			background-color: #fff;
			box-shadow: 0 0 40px #9A9A9A;
		}
	}
</style>

<script>
	import Pie from './Pie.vue'
	import Img from './Img.vue'
	import Text from './Text.vue'
	import Icon from './Icon.vue'
	import Line from './Line.vue'
	import Geometric from './Geometric.vue'
	import Background from './Background.vue'
	import constants from '../../data/constants.js'

	export default {
		name: 'canvas-element',
		props: ['content', 'selectid'],
		computed: {
			style() {
				let screenWidth = window.screen.availWidth
				let width = screenWidth - 300 - 150
				let height = width * constants.CANVAS_HEIGHT / constants.CANVAS_WIDTH
				return {
					'width': width + 'px',
					'height': height + 'px',
					'max-width': constants.CANVAS_WIDTH + 'px',
				}
			}
		},
		methods: {
			elementComponent(key) {
				return this.content[key].type + '-component'
			}
		},
		components: {
			'pie-component': Pie,
			'img-component': Img,
			'line-component': Line,
			'icon-component': Icon,
			'text-component': Text,
			'geometric-component': Geometric,
			'background-component': Background
		},
		watch: {
		},
		ready: function() {
      $('#canvas').niceScroll({
        cursorcolor: '#d6d6d6',
        railalign: 'right',
        horizrailenabled: false,
        cursoropacitymin:0,
        autohidemode: false
      })
		}
	}
</script>