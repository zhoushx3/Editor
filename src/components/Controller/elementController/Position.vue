<template lang="jade">
	.container
		.flex-box
			label 横坐标 
			input(type="number", :value="left", @input="setStyle('left', $event)")
		.flex-box
			label 纵坐标 
			input(type="number", :value="top", @input="setStyle('top', $event)")
				
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

	export default {
		name: 'position-controller',
		props: ['element'],
		data() {
			return {
			}
		},
		computed: {
			left() {
				return parseInt(this.element.position.left) || 0
			},
			top() {
				return parseInt(this.element.position.top) || 0
			}
		},
		methods: {
			setStyle(property, event) {
				ElementAction.setStyle(property, event.target.value)
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
