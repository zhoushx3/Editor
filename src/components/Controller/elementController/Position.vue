<template lang="jade">
	.flex-box.position
		label 横坐标 
		input(type="number", :value="left", @input="setStyle('left', $event)")
	.flex-box.position
		label 纵坐标 
		input(type="number", :value="top", @input="setStyle('top', $event)")
				
</template>

<style lang="less" scoped>
	@import '../../../less/variable.less';

	.flex-box.position {
		width: 50%;
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
