<template lang="jade">
	.wrapper(:style="style")
		.mask(@mousedown="drag", :class="targeted")
			.se-flex(@mousedown="flex('se', $event)" v-if="type === 'icon'")
		slot

</template>

<!-- 			template(v-if="type !== 'geometric'")
				.leftToFlex.flexCircle(@mousedown="flex('left', $event)")
				.rightToFlex.flexCircle(@mousedown="flex('right', $event)")
				.topToFlex.flexCircle(@mousedown="flex('top', $event)")
				.bottomToFlex.flexCircle(@mousedown="flex('bottom', $event)") -->
<style lang="less" scoped>
	.wrapper {
		position: absolute;
		outline: none;
		cursor: move;
		font-size: 0; // 这个为了除去空格占的位置

		.mask {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 1;

			&:hover, &.targeted {
				border: 1px dashed #000;
				.flexCircle {
					display: block;
				}
				.se-flex {
					display: block;
				}
			}

			.se-flex {
		    position: absolute;
		    right: -3px;
		    bottom: -3px;
		    width: 12px;
		    height: 12px;
		    border: 3px solid #222;
		    border-left-color: transparent;
		    border-top-color: transparent;
		    cursor: se-resize;
		    display: none;
			}

			.flexCircle {
				width: 10px;
				height: 10px;
				position: absolute;
				background-color: #aaa;
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
			.bottomToFlex {
				cursor: n-resize;
				left: 50%;
				margin-left: -5px;
			}

			.topToFlex {
				top: -5px;
			}

			.bottomToFlex {
				bottom: -5px;
			}
		}
	}
</style>

<script>
	import { px } from '../helper/func.js'
	import ElementAction from '../Action2Store/ElementAction.js'

	export default {
		name: 'wrapper',
		props: ['element', 'key', 'selectId'],
		computed: {
			style() {
				return Object.assign({}, this.element.position, this.element.style)
			},
			targeted() {
				return this.selectId == this.key ? 'targeted' : ''
			}
		},
		methods: {
			drag: function(event) {
				// 此处是为了禁掉浏览器默认事件，并且禁止节点传播，下同
				event.preventDefault()
				event.stopPropagation()
				// 拖拽
				ElementAction.selectElement(this.key)
				window.dragEvent.trigger('d_' + this.key, event.clientX, event.clientY)
			},
			flex: function(direction, event) {
				event.preventDefault()
				event.stopPropagation()
				// 横向纵向伸缩 
				window.flexEvent.register('f_' + this.key, event.clientX, event.clientY, direction)
			}
		}
	}
</script>