<template lang="jade">
	wrapper(:element="element", :key="key", :selectid="selectid") 
		.back-color(:style="backColor")
			.pie2-color(:style="pie2Color")
			.pie1-color(:style="pie1Color")
			.front-color(:style="frontColor")
</template>

<style lang="less" scoped>
	.back-color {
		background-color: #aaa;
		width: 100px;
		height: 100px;
		border-radius: 50%;
		position: relative;
		overflow: hidden;
		.pie1-color, .pie2-color {
			position: absolute;
			left: 50%;
			right: 0;
			top: 0;
			bottom: 0;
			background-color: #ff0;
		}
		.pie1-color {
	    transform-origin: left center;
	    background: #aaa;
		}
		.front-color {
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			margin: auto;
			width: 85%;
			height: 85%;
			margin: auto;
			background-color: #fff;
			border-radius: 50%;
		}
	}

</style>
<script>
	import Wrapper from '../Wrapper.vue'

	export default {
		name: 'pie-component',
		props: ['key', 'element', 'selectid'],
		data() {
			return {
			}
		},
		computed: {
			score() {
				return this.element.score
			},
			option() {
				return this.element.option
			},
			backColor() {
				return {
					'background-color': this.option['back-color'],
					'width': this.option['width'] || '30px',
					'height': this.option['width'] || '30px'
				}
			},
			frontColor() {
				return {
					'background-color': this.option['front-color']
				}
			},
			pie1Color() {
				if (this.score <= 50) {
					return {
						'background-color': this.option['back-color'],
						'transform': `rotate(${Math.floor(this.score * 3.6)}deg)`
					}
				}

				return {
					'background-color': this.option['success-color'],
					'transform': `rotate(${Math.floor((this.score - 50) * 3.6)}deg)`
				}
			},
			pie2Color() {
				return {
					'background-color': this.option['success-color']
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