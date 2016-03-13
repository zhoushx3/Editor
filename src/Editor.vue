<template lang="jade">
	.head
		input( type="range", min="1" max="10" step="0.01" v-model="scale" )
	element-list( :content="content",
							   v-ref:elementlist )
	canvas-element( :scale="scale",
									:content="content",
									v-ref:canvaselement)
	controller(:content="content")
</template>

<style lang="less" scoped>
	.head {
		height: 30px;
		width: 100%;
		input[type="range"] {
      -webkit-box-shadow: 0 1px 0 0px #424242, 0 1px 0 #060607 inset, 0px 2px 10px 0px black inset, 1px 0px 2px rgba(0, 0, 0, 0.4) inset, 0 0px 1px rgba(0, 0, 0, 0.6) inset;
      margin: 5px auto;
      background-color: #272728;
      border-radius: 15px;
      width: 400px;
      -webkit-appearance: none;
      height:10px;
      outline: none;
  	}
  	input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      cursor: default;
      top: -5px;
      height: 30px;
      width: 20px;
      transform: translateY(-4px);
      background: none repeat scroll 0 0 #777;
      border-radius: 15px;
      -webkit-box-shadow: 0 -1px 1px black inset;
		}
	}
</style>

<script>
	import Drag from './helper/Drag.js'
	import ElementList from './components/ElementList.vue'
	import CanvasElement from './components/CanvasElement/CanvasElement.vue'
	import Controller from './components/Controller.vue'
	import resumeJSON from './helper/resumeJSON.js'
	import DragEvent from './helper/DragEvent.js'
	import FlexEvent from './helper/FlexEvent.js'
	import dataEvent from './helper/DataEvent.js'
	import { px, lower, upper } from './helper/func.js'

	import './less/common.less'

	export default {
		el: 'body',
		replace: false,
		name: 'editor',
		data() {
			return {
				scale: 1,
				content: {}
			}
		},

		components: {
			'element-list': ElementList,
			'canvas-element': CanvasElement,
			'controller': Controller
		},
		events: dataEvent,
		methods: {
			dragCallback(key, delX, delY) {
				let k = key.replace('d_', '')
				let originStyle = this.content[k]['style']
				originStyle['left'] = parseInt(originStyle['left']) + delX + 'px'
				originStyle['top'] = parseInt(originStyle['top']) + delY + 'px'
			},

			dragUpCallback() {
				this.$refs.elementlist.hook = []
			},
			// 伸缩设置最小宽度、最小高度
			flexCallback(key, del, type) {
				let minW = 10
				let minH = 10
				let k = key.replace('f_', '')

				let originStyle = this.content[k]['style']
				let left = parseInt(originStyle['left'])
				let top = parseInt(originStyle['top'])
				let width = parseInt(originStyle['width'])
				let height = parseInt(originStyle['height'])

				switch (type) {
					case 'left':
						originStyle['left']  = px ( upper( left + del, left + width - minW ) )
						originStyle['width'] = px ( lower( width - del, minW ) )
					break
					case 'right':
						originStyle['width'] = px ( lower( width + del, minW ) )
					break
					case 'top':
						originStyle['top'] = px ( upper( top + del, top + height - minH ) )
						originStyle['height']  = px ( lower ( height - del, minH ) )
					break
					case 'bottom':
						originStyle['height'] = px ( lower( height + del, minH ) )
					break
				}
			}

		},
		watch: {
		},
		ready() {
			let vm = this

			resumeJSON.init(vm).then( (bool)=>{
				if (bool) {
					this.content = resumeJSON.getContent()
				}
			})

			window.dragEvent = new DragEvent( vm.dragCallback.bind(vm), vm.dragUpCallback.bind(vm), document.getElementById('canvas') )
			window.flexEvent = new FlexEvent( vm.flexCallback.bind(vm), document.getElementById('canvas'))
		}
	}
</script>
