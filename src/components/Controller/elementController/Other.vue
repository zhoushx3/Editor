<template lang="jade">
	.flex-box.percentage
		percentage(type="opacity", :value="opacity")
	.flex-box.percentage(v-if="type !== 'background'")
		percentage(type="rotate", :value="rotate")
</template>

<style lang="less" scoped>
	@import '../../../less/variable.less';

	.flex-box.percentage {
		width: 100%;
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
