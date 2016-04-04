<template lang="jade">
	.wrapper(:style="style", :keyId="key")
		slot
		.mask(@mousedown="drag", :class="targeted", :style="optionStyle")
			.se-flex(v-if="seType", @mousedown="flex('se', $event)" )
			.w-flex.flex(v-if="weType", @mousedown="flex('w', $event)")
			.e-flex.flex(v-if="weType", @mousedown="flex('e', $event)")
			.n-flex.flex(v-if="nsType", @mousedown="flex('n', $event)")
			.s-flex.flex(v-if="nsType", @mousedown="flex('s', $event)")

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
			min-height: 2px;//为line考虑, line的height:0

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
				type: this.element.type,
				// zIndex: parseInt(this.element.style.zIndex || 0)
				// 这个写法会使zIndex永远不变，应该是因为没有和DOM双向绑定
			}
		},
		computed: {
			style() {
				return Object.assign({}, this.element.position, this.element.style)
			},
			optionStyle() {
				let o = {}
				if (this.type === 'line')
					o.height = this.element.style['border-bottom-width']
				return o
			},
			zIndex() {
				// 这个写法会监听到改变，归功于style / element变化
				return parseInt(this.style.zIndex || 0)
			},
			targeted() {
				return this.selectid == this.key ? 'targeted' : ''
			},
			weType() {
				let typeList = ['text', 'img', 'line']
				return typeList.indexOf(this.type) !== -1
			},
			nsType() {
				let typeList = ['img']
				return typeList.indexOf(this.type) !== -1
			},
			seType() {
				let typeList = ['icon', 'geometric', 'pie']
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
			},
			moveZIndex(n) {
				EditorAction.resetElementId(this.key)
				switch(n) {
					case -1:
						ElementAction.setStyle('zIndex', this.zIndex-1)
						break
					case 1:
						ElementAction.setStyle('zIndex', this.zIndex+1)
						break
					case 0:
						ElementAction.setStyle('zIndex', 0)
						break
				}
			}
		},
		ready() {
			let self = this
			if (this.type === 'background') {
				$.contextMenu({
		      selector: `[keyId=${this.key}]`,
		      animation: {duration: 200, show: 'slideDown', hide: 'slideUp'},
		      className: 'contextmenu-custom contextmenu-custom__highlight',
					zIndex: ()=>{
						return 999
					},
					items: {
						paste: {
							name: '粘贴',
							disabled:()=>{
								return EditorAction.copyElement == null
							},
							callback: (key, opt) => {
								console.log(arguments)
								EditorAction.paste()
							}
						}
					}
				})
			} else {
		    $.contextMenu({
		      selector: `[keyId=${this.key}]`,
		      animation: {duration: 200, show: 'slideDown', hide: 'slideUp'},
		      className: 'contextmenu-custom contextmenu-custom__highlight',
		      zIndex: function() {
		      	return self.zIndex + 1
		      },
		      items: {
		        copy: {
		          name: '复制',
		          callback: (key, opt) => {
		          	EditorAction.preCopy(this.element)
		          }
		        },
		        delete: {
		        	name: '删除',
		        	callback: (key, opt) => {
		        		EditorAction.deleteElement(this.key)
		        	}
		        },
		        moveUp: {
		        	name: '上移一层',
		        	callback:(key, opt)=>{
		        		this.moveZIndex(1)
		        	}
		        },
		        moveDown: {
		        	name: '下移一层',
		        	disabled: ()=>{
		        		console.log(this.zIndex, this.style.zIndex)
		      			return this.style.zIndex === 0
		        	},
		        	callback:()=>{
		        		this.moveZIndex(-1)
		        	}
		        },
		        moveBottom: {
		        	name: '下移至底层',
		        	callback:()=>{
		        		this.moveZIndex(0)
		        	}
		        }
		      },
		      trigger: 'right',
		      reposition: true,
		      autoHide: false,
		    })
			}
		}
	}
</script>