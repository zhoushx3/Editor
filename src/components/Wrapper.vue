<template lang="jade">
	.wrapper(:style="style")
		.mask(@mousedown="drag", :data-key="'d_' + key")
			.leftToFlex.flexCircle(@mousedown="flex('left', $event)")
			.rightToFlex.flexCircle(@mousedown="flex('right', $event)")
			.topToFlex.flexCircle(@mousedown="flex('top', $event)")
			.downToFlex.flexCircle(@mousedown="flex('bottom', $event)")
		slot

</template>

<style lang="less">
	.wrapper {
		position: absolute;
		outline: none;
		left: 0;
		cursor: move;
		font-size: 0; // 这个为了除去空格占的位置

		.mask {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 1;

			&:hover {
				border: 1px dashed #000;
				.flexCircle {
					display: block;
				}
			}


			.flexCircle {
				width: 10px;
				height: 10px;
				position: absolute;
				background-color: #fff;
				border-radius: 50%;
				z-index: 2;
				display: none;
			}

			.leftToFlex,
			.rightToFlex {
				cursor: e-resize;
				top: 50%;
				margin-top: -5px;
			}

			.leftToFlex {
				left: -5px;
			}

			.rightToFlex {
				right: -5px;
			}

			.topToFlex,
			.downToFlex {
				cursor: n-resize;
				left: 50%;
				margin-left: -5px;
			}

			.topToFlex {
				top: -5px;
			}

			.downToFlex {
				bottom: -5px;
			}

		}
	}
</style>

<script>
	import {px} from '../helper/func.js'

	export default {
		name: 'wrapper',
		props: ['style', 'key'],
		data() {
			return {
			}
		},
		methods: {
			drag: function(event) {
				event.preventDefault()
				event.stopPropagation()
				// 拖拽
				window.dragEvent.trigger('d_' + this.key, event.clientX, event.clientY)
				return false // 此处是为了禁掉浏览器默认事件，并且禁止节点传播，下同
			},
			flex: function(type, event) {
				event.preventDefault()
				event.stopPropagation()
				// 伸缩
				window.flexEvent.register('f_' + this.key, event.clientX, event.clientY, type)
				return false
			}
		}

	}
</script>