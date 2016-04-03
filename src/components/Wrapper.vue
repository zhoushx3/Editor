<template lang="jade">
	.wrapper(:style="style")
		.mask(@mousedown="drag", :class="targeted")
			.se-flex(v-if="seType", @mousedown="flex('se', $event)" )
			.w-flex.flex(v-if="weType", @mousedown="flex('w', $event)")
			.e-flex.flex(v-if="weType", @mousedown="flex('e', $event)")
			.n-flex.flex(v-if="nsType", @mousedown="flex('n', $event)")
			.s-flex.flex(v-if="nsType", @mousedown="flex('s', $event)")
		slot

</template>

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
				.flex {
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

			.flex {
				width: 10px;
				height: 10px;
				position: absolute;
				background-color: #aaa;
				border-radius: 50%;
				z-index: 2;
				display: none;
			}

			.w-flex,
			.e-flex {
				cursor: e-resize;
				top: 50%;
				margin-top: -5px;
			}

			.w-flex {
				left: -5px;
			}

			.e-flex {
				right: -5px;
			}

			.n-flex,
			.s-flex {
				cursor: n-resize;
				left: 50%;
				margin-left: -5px;
			}

			.n-flex {
				top: -5px;
			}

			.s-flex {
				bottom: -5px;
			}
		}
	}
</style>

<script>
	import EditorAction from '../Action2Store/EditorAction.js'
	import ElementAction from '../Action2Store/ElementAction.js'

	export default {
		name: 'wrapper',
		props: ['element', 'key', 'selectid'],
		data() {
			return {
				type: this.element.type
			}
		},
		computed: {
			style() {
				return Object.assign({}, this.element.position, this.element.style)
			},
			targeted() {
				return this.selectid == this.key ? 'targeted' : ''
			},
			weType() {
				let typeList = ['text', 'img']
				return typeList.indexOf(this.type) !== -1
			},
			nsType() {
				let typeList = ['img']
				return typeList.indexOf(this.type) !== -1
			},
			seType() {
				let typeList = ['icon', 'geometric']
				return typeList.indexOf(this.type) !== -1
			}
		},
		methods: {
			drag: function(event) {
				EditorAction.resetElementId(this.key)
				if ( this.type === 'background')
					return 
				// 此处是为了禁掉浏览器默认事件，并且禁止节点传播，下同
				event.preventDefault()
				event.stopPropagation()
				// 拖拽
				ElementAction.drag(this.key, event.clientX, event.clientY)
			},
			flex: function(direction, event) {
				event.preventDefault()
				event.stopPropagation()
				// 横向纵向伸缩 
				EditorAction.resetElementId(this.key)
				ElementAction.flex(this.key, event.clientX, event.clientY, direction)
			}
		}
	}
</script>