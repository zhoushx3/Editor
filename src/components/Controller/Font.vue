<template lang="jade">
	.container
		.label-row
			h3 文本内容
			textarea
		.label-row
			.label-col
				h3 字体类型
				select(v-model="selectFont")
					option(v-for="o in fontFamily", :value="o.family") {{ o.name }}
			.label-col
				h3 字号
				select(v-model="selectFontSize")
					option(v-for='o in fontSize', :value="fontSize[o]")
			.label-col
				h3 行距
				select(v-model="selectLineHeight")
					option(v-font="o in lineHeight", :value="o")
		.label-row
			h3 对齐
			input(type="radio" name="textAlign" value="left")
			label 左对齐
			input(type="radio" name="textAlign" value="center")
			label 居中
			input(type="radio" name="textAlign" value="right")
			label 右对齐


</template>

<style lang="less">
	@import '../../less/variable.less';

	.container {
		background-color: @controller-background-color;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		align-content: flex-start;
		.label-row {
			width: 80%;
			display: flex;
			flex-direction: row;
			justify-content: space-around;

			.label-col {
				width: 30%;
				label {
					display: block;
					text-align: center;
				}
			}
		}
	}
</style>


<script>
	import { fontFamily, fontSize, lineHeight } from '../../data/fontRelative.js'

	export default {
		name: 'font-controller',
		props: ['element'],
		data() {
			return {
				fontFamily: fontFamily,
				fontSize: fontSize,
				selectFont: 'SimSun',
				selectFontSize: '12px'
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