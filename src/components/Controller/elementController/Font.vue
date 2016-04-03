<template lang="jade">
	.container
		.flex-box.content
			label 内容
			textarea(placeholder="最多250字" maxlength=250, :value="text", @input="setText")
		.flex-box
			label 字号
			input(type="number", :value="fontSize", @input="setStyle('fontSize', $event)")
		.flex-box
			label 行距
			input(type="number", :value="lineHeight", @input="setStyle('lineHeight', $event)")
		.flex-box
			label 字符间距
			input(type="number", :value="letterSpacing", @input="setStyle('letterSpacing', $event)")
		.flex-box
			label 颜色
			//- ColorPicker(type="color", :value="color")
		.flex-box.text-align
			label 对齐
			div(v-for="align in alignBtn",
					:class="align[0] == textAlign ? 'active' : ''",
					@click="setStyle('textAlign', align[0])") {{ align[1] }}

</template>

<style lang="less" scoped>
	@import '../../../less/variable.less';

	.container {
		background-color: @controller-background-color;
		display: flex;
		justify-content: center;
		align-items: center;
		align-content: flex-start;
		flex-wrap: wrap;
		width: 100%;
		padding: 10px;
		box-sizing: border-box;
		border-bottom: 1px solid #d6d6d6;

		.flex-box {
			width: 50%;
			display: flex;
			justify-content: space-around;
			padding: 15px 0;

			label {
				width: 24%;
				font-size: 13px;
				text-align: left;
			}
			input {
				width: 60%;
			}
			&.content {
				width: 100%;
				label {
					width: 13%;
				}
				textarea {
					width: 80%;
					height: 100px;
					resize: none;
					border-radius: 2px;
					border: 1px solid #ececec;
				}
			}
			&.text-align {
				width: 100%;
				label {
					width: 12%;
				}

				div {
					width: 25%;
					line-height: 18px;
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
		}
	}
</style>


<script>
	import ElementAction from '../../../Action2Store/ElementAction.js'
	import { fontFamily, fontSize, lineHeight } from '../../../data/fontRelative.js'

	export default {
		name: 'font-controller',
		props: ['element'],
		data() {
			return {
				fontFamily: fontFamily,
				selectFont: 'SimSun',
				alignBtn: [ ['left', '左对齐'], ['center', '居中'], ['right', '右对齐'] ]
			}
		},
		computed: {
			text() {
				return this.element.text || ''
			},
			fontSize() {
				return parseInt(this.element.style.fontSize) || 0
			},
			lineHeight() {
				return parseInt(this.element.style.lineHeight) || 0
			},
			letterSpacing() {
				return parseInt(this.element.style.letterSpacing) || 0
			},
			textAlign() {
				return this.element.style.textAlign || 'left'
			},
			color() {
				return this.element.style.color
			}
		},
		methods: {
			setStyle(property, event) {
				switch(property) {
					case 'textAlign':
						ElementAction.setStyle(property, event)
					break
					default:
						ElementAction.setStyle(property, event.target.value)
					break
				}
			},
			setText(event) {
				ElementAction.setStyle('text', event.target.value)
			},
		},
		components: {
		},
		watch: {

		},
		ready() {

		}
	}

</script>
