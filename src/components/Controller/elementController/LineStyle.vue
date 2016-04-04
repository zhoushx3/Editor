<template lang="jade">
	.flex-box
		label 左下圆角
		input(type="number", :value="borderBottomLeftRadius", @input="setStyle('border-bottom-left-radius', $event)")
	.flex-box
		label 右下圆角
		input(type="number", :value="borderBottomRightRadius", @input="setStyle('border-bottom-right-radius', $event)")
	.flex-box.style
		label 样式
		div(v-for="style in borderStyle",
				:class="style[0] == borderBottomStyle ? 'active' : ''",
				@click="setStyle('border-bottom-style', style[0])") {{ style[1] }}

</template>

<style lang="less" scoped>
	@import '../../../less/variable.less';
	
	.flex-box.style {
		width: 100%;

		div {
			width: 70px;
			line-height: 27px;
			border-radius: 2px;
			text-align: center;
			font-size: 12px;
			cursor: pointer;
			background-color: #fff;
			color: #16E4D8;
			
			&.active {
				background-color: #16E4D8;
				color: #fff;
			}
		}
	}
</style>


<script>
	import ElementAction from '../../../Action2Store/ElementAction.js'

	export default {
		name: 'font-controller',
		props: ['element'],
		data() {
			return {
				borderStyle: [ ['dashed', '虚线'], ['solid', '实线'], ['dotted', '点虚线'], ['double', '双层'], ['groove', '凹槽'], ['ridge', '山脊'] ]
			}
		},
		computed: {
			borderBottomStyle() {
				return this.element.style['border-bottom-style'] || ''
			},
			borderBottomLeftRadius() {
				return parseInt(this.element.style['border-bottom-left-radius'] || 0) 
			},
			borderBottomRightRadius() {
				return parseInt(this.element.style['border-bottom-right-radius'] || 0)
			}
		},
		methods: {
			setStyle(property, event) {
				switch(property) {
					case 'border-bottom-style':
						ElementAction.setStyle(property, event)
						break
					default:
						ElementAction.setStyle(property, event.target.value)
					break
				}
			}
		},
		components: {
		},
		watch: {

		},
		ready() {

		}
	}

</script>
