<template lang="jade">
	template(v-for="value in values" track-by="key")
		.flex-box.size(:style="sizeWidth")
			label {{ value.cn }}
			input(type="number", :value="value.value", @input="setStyle(value.key, $event)")
				
</template>

<style lang="less" scoped>
	@import '../../../less/variable.less';

	.flex-box.size {
		width: 50%;
	}
</style>


<script>
	import ElementAction from '../../../Action2Store/ElementAction.js'

	export default {
		name: 'size-controller',
		props: ['element'],
		data() {
			return {
			}
		},
		computed: {
			sizeWidth() {
				let l = this.values.length
				if (l === 2) return {width: '50%'}
				else if (l === 1) return { width: '100%'}
				else if (l === 0) return { display: 'none'}
			},
			type() {
				return this.element.type
			},
			values() {
				switch(this.type) {
					case 'icon':
						return [{key: 'fontSize', value: parseInt(this.element.style.fontSize || 0), cn: '大小'}]
						break
					case 'text':
						return [{key: 'width', value: parseInt(this.element.style.width || 0), cn: '宽度'}]
						break
					case 'img':
						return [{
							key: 'width', value: parseInt(this.element.style.width || 0), cn: '宽度'
						}, {
							key: 'height', value: parseInt(this.element.style.height || 0), cn: '高度'
						}]
						break
					case 'geometric':
					case 'pie':
						return [{
							key: 'widthHeight', value: parseInt(this.element.option.width || 30), cn: '大小'
						}] // right now....
						break
					case 'background':
						return []
						break
					case 'line':
						return [{
							key: 'width', value: parseInt(this.element.style.width || 0), cn: '宽度'
						}, {
							key: 'border-bottom-width', value: parseInt(this.element.style['border-bottom-width'] || 0), cn: '厚度'
						}]
				}
			}
		},
		methods: {
			setStyle(property, event) {
				if (property === 'width') {
					event.target.value = event.target.value > parseInt($('#center-canvas').width()) ? parseInt($('#center-canvas').width()) : event.target.value
				}
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
