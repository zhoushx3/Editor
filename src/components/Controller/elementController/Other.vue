<template lang="jade">
	.container
		.flex-box.percentage
			percentage(type="opacity", :value="opacity")
		.flex-box.percentage(v-if="type !== 'background'")
			percentage(type="rotate", :value="rotate")
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

		.flex-box.percentage {
			width: 100%;
			display: flex;
			justify-content: space-around;
			padding: 15px 0;

			label {
				width: 30%;
				font-size: 13px;
				text-align: left;
			}
			input {
				width: 60%;
			}
		}
	}
</style>


<script>
	import ElementAction from '../../../Action2Store/ElementAction.js'
	import Percentage from './Percentage.vue'

	export default {
		name: 'other-controller',
		props: ['element'],
		computed: {
			opacity() {
				// 小数来着，不能ParseInt
				let value = this.element.style.opacity
				return value !== undefined ? Math.floor(Number(value)*100) : 100
			},
			rotate() {
				let value = this.element.style.transform
				console.log(value)
				return value !== undefined ? parseInt(value.replace(/[rotate()deg]/ig, '')) : 0
			},
			type() {
				return this.element.type
			}
		},
		methods: {
			setStyle(property, event) {
				ElementAction.setStyle(property, event.target.value)
			}
		},
		components: {
			'percentage': Percentage
		}
	}

</script>
