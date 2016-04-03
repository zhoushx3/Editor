<template lang="jade">
	.controller
		component(v-if="selectid === undefined", :is="currentPanel")
		template(v-else)
			//- color(v-if="showColorController", :element="element")
			//- flex(v-if="showFlexController", :element="element" )
			font(v-if="showFontController", :element="element" )
			position(v-if="showPositionController", :element="element")
			size(:element="element")
			other(:element="element")
	.group
		.group-single(@click="showPanel('single')")
		.group-group(@click="showPanel('group')")
		.group-page(@click="showPanel('page')")
</template>

<style lang="less">
	.controller {
		position: absolute;
		top: 30px;
		bottom: 0;
		right: 0;
		width: 300px;
		border-left: 1px solid #000;
		overflow: hidden;
	}
	.group {
		position: absolute;
		right: 300px;
		top: 130px;
		width: 50px;
		height: 200px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		z-index: 999;

		.group-single,
		.group-group,
		.group-page {
			position: relative;
			width: 30px;
			height: 30px;
			line-height: 30px;
			border-radius: 50%;
			box-shadow: 0 0 5px #aaa;
			text-align: center;
			cursor: pointer;

			&:hover:before {
				position: absolute;
				left: -50px;
				font-size: 12px;
				font-family: "Microsoft Yahei";
			}
		}
		.group-single:hover:before {
			content: '基本元素';
		}
		.group-group:hover:before {
			content: '组合模板';
		}
		.group-page:hover:before {
			content: '页模板';
		}
	}
</style>


<script>
	import Other from './elementController/Other.vue'
	import Font from './elementController/Font.vue'
	import Color from './elementController/Color.vue'
	import Size from './elementController/Size.vue'
	import Position from './elementController/Position.vue'
	import groupPage from './groupPage.vue'
	import groupGroup from './groupGroup.vue'
	import groupSingle from './groupSingle.vue'
	import EditorAction from '../../Action2Store/EditorAction.js'

	export default {
		name: 'controller',
		props: ['element', 'selectid'],
		data() {
			return {
				currentPanel: 'group-' + 'single',
			}
		},
		computed: {
			type() {
				return this.element['type']
			},
			showColorController() {
				let type = ['icon', 'text', 'geometric', 'background']
				return type.indexOf(this.type) !== -1
			},
			showFontController() {
				let type = ['text']
				return type.indexOf(this.type) !== -1
			},
			showFlexController() {
				let type = ['text', 'img']
				return type.indexOf(this.type) !== -1
			},
			showPositionController() {
				let type = ['icon', 'text', 'geometric', 'img']
				return type.indexOf(this.type) !== -1
			}
		},
		methods: {
			showPanel(type) {
				EditorAction.resetElementId(undefined)
				this.currentPanel = 'group-' + type
			}
		},
		watch: {
		},
		components: {
			'group-single': groupSingle,
			'group-group': groupGroup,
			'group-page': groupPage,
			'font': Font,
			'color': Color,
			'size': Size,
			'other': Other,
			'position': Position
		},
		ready() {
		}
	}

</script>