<template lang="jade">
	#controller
		component(v-if="selectid === undefined", :is="currentPanel")
		template(v-else)
			.container
				color(v-if="showColorController", :element="element", :selectid="selectid")
				font(v-if="showFontController", :element="element" )
				position(v-if="showPositionController", :element="element")
				size(:element="element")
				other(:element="element")
				linestyle(v-if="type==='line'", :element="element")
	.group
		.group-single(@click="showPanel('single')")
		.group-group(@click="showPanel('group')")
		.group-page(@click="showPanel('page')")
</template>

<style lang="less">
// 拆出来是为了减少因为后代选择器造成的优先级过高
	@import '../../less/variable.less';

	#controller {
		position: absolute;
		top: 30px;
		bottom: 0;
		right: 0;
		width: 300px;
		overflow: hidden;
		background-color: @controller-background-color;
	}
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		align-content: space-between;
		flex-wrap: wrap;
		width: 100%;
		padding: 10px;
		box-sizing: border-box;
	}
	.flex-box {
		width: 50%;
		display: flex;
		justify-content: flex-start;
		padding: 15px 0;
		border-bottom: 1px solid #d6d6d6;

		label {
			width: 53.1px;
			font-size: 13px;
			text-align: left;
			line-height: 27px;
		}
		input {
			width: 70px;
    	height: 25px;
			border-radius: 2px;
		}
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
	import LineStyle from './elementController/LineStyle.vue'
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
				let type = ['icon', 'text', 'geometric', 'background', 'line']
				return type.indexOf(this.type) !== -1
			},
			showFontController() {
				let type = ['text']
				return type.indexOf(this.type) !== -1
			},
			showPositionController() {
				let type = ['icon', 'text', 'geometric', 'img', 'line']
				return type.indexOf(this.type) !== -1
			}
		},
		methods: {
			showPanel(type) {
				EditorAction.resetElementId(undefined)
				this.$broadcast('closeNest')
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
			'position': Position,
			'linestyle': LineStyle
		},
		ready() {
      $('#controller').niceScroll({
        cursorcolor: '#d6d6d6',
        railalign: 'right',
        horizrailenabled: false,
        cursoropacitymin:0,
        autohidemode: false
      })
		}
	}

</script>