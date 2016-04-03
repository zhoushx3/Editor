<template lang="jade">
	header-element
	//- element-list( :content="content",
							   v-ref:elementlist )
	canvas-element( :scale="scale",
									:content="content",
									:selectid="selectid",
									v-ref:canvaselement)
	controller(:element="selectElement", :selectid="selectid")
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
	import Header from './components/Header.vue'
	import ElementList from './components/ElementList.vue'
	import CanvasElement from './components/CanvasElement/CanvasElement.vue'
	import Controller from './components/Controller/Controller.vue'
	import Store from './Action2Store/Store.js'
	import Event from './Action2Store/Event.js'
	import DragEvent from './helper/DragEvent.js'
	import FlexEvent from './helper/FlexEvent.js'

	import './less/common.less'

	const JSON_DATA = 'JSON_DATA'

	export default {
		el: 'body',
		replace: false,
		name: 'editor',
		data() {
			return {
				content: {},
				contentNum: 1,
				selectid: undefined,
				selectElement: undefined
			}
		},

		components: {
			'header-element': Header,
			'element-list': ElementList,
			'canvas-element': CanvasElement,
			'controller': Controller,
		},
		methods: {
			_getJson(json, selectid, selectElement) {
				this.content = json.content
				this.contentNum = json.contentNum
				this.selectid = selectid
				this.selectElement = selectElement
			}

		},
		watch: {},
		ready() {
			let vm = this
			Event.addChangeListener(JSON_DATA, this._getJson)
			Store.fetchJson()

			window.dragEvent = new DragEvent(document.getElementById('canvas'))
			window.flexEvent = new FlexEvent(document.getElementById('canvas'))
		}
	}
</script>
