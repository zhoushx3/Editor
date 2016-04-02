<template lang="jade">
	.controller
		.group
			.group-single(@click="showPanel('single')")
			.group-group(@click="showPanel('group')")
			.group-page(@click="showPanel('page')")

		component(v-if="!selectId", :is="currentPanel")
		//- template(v-if="!selectId")
		//- 	h2 点击画布上的元素
		//- 	//- template(v-else)
		//- 	//- font(:element="element" v-if="showFontController")
		//- 	//- color(:element="element" v-if="showColorController")
		//- 	//- scale(:element="element" v-if="showScaleController")
		//- 	//- flex(:element="element" v-if="showFlexController")

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
		
		.group {
			position: absolute;
			left: -50px;
			top: 100px;
			width: 50px;
			height: 200px;
			display: flex;
			flex-direction: column;
			justify-content: space-around;

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
	}
</style>


<script>
	import groupSingle from './groupSingle.vue'
	import groupGroup from './groupGroup.vue'
	import groupPage from './groupPage.vue'
	import EditorAction from '../../Action2Store/EditorAction.js'

	export default {
		name: 'controller',
		props: ['element', 'selectId'],
		data() {
			return {
				currentPanel: 'group-' + 'single'
			}
		},
		computed: {
			showColorController() {
				let type = ['icon', 'text', 'geometric', 'background']
				return type.indexOf(this.element['type']) !== -1
			},
			showFontController() {
				let type = ['text']
				return type.indexOf(this.element['type']) !== -1
			},
			showScaleController() {
				let type = ['geometric', 'icon']
				return type.indexOf(this.element['type']) !== -1
			},
			showFlexController() {
				let type = ['text', 'img']
				return type.indexOf(this.element['type']) !== -1
			}
		},
		methods: {
			showPanel(type) {
				EditorAction.resetElementId(undefined)
				this.currentPanel = 'group-' + type
			}
		},
		components: {
			'group-single': groupSingle,
			'group-group': groupGroup,
			'group-page': groupPage,
			// 'font': Font,
			// 'color': Color,
			// 'scale': Scale,
			// 'flex': Flex
		},
		ready() {
			console.log(this.selectId)
		}
	}

</script>