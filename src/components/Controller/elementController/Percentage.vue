<template lang="jade">
	div
		label {{ property.name }}
		input(type="range",
					:min="property.min",
					:max="property.max",
					:step="property.step",
					:value="property.value",
					@input="setStyle")
		input(type="number", :value="property.value" @input="setStyle")
</template>

<style lang="less" scoped>
	div {
		width: 100%;
		display: flex;
		justify-content: space-around;
		label {
			width: 30%;
		}
		input[type="range"] {
			width: 50%;
		}
		input[type="number"] {
			width: 20%;
		}
		
	}
</style>


<script>
	import ElementAction from '../../../Action2Store/ElementAction.js'

	export default {
		name: 'percentage-controller',
		props: ['type', 'value'],
		computed: {
			property() {
				let type = this.type
				let value = this.value
				let min = 0
				let max = 1
				let step = 1
				let name = ''
				switch (type) {
					case 'opacity':
						name = '透明度'
						max = 100
						break
					case 'rotate':
						name = '旋转'
						max = 360
						break
				}
				return {
					name: name,
					min: min, 
					max: max,
					step: step,
					value: value
				}
			}
		},
		methods: {
			setStyle(event) {
				let max = this.property.max
				let value = Number( event.target.value || 0 )
				value = isNaN(value) ? 0 : value
				value = value < 0 ? ($(this.$el).find('input[type="number"]').val(0), 0) : value
				value = value > max ? ($(this.$el).find('input[type="number"]').val(max), max) : value
				ElementAction.setStyle(this.type, value)
			}
		},
		watch: {
		}
	}

</script>
