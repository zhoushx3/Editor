<template lang="jade">
	.container
		template(v-for="value in values" track-by="key")
			.flex-box
				label {{ value.cn }}
				input(type="number", :value="value.value", @input="setStyle(value.key, $event)")
				
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
		name: 'size-controller',
		props: ['element'],
		data() {
			return {
			}
		},
		computed: {
			type() {
				return this.element.type
			},
			values() {
				switch(this.type) {
					case 'icon':
						return [{key: 'fontSize', value: parseInt(this.element.style.fontSize) || 0, cn: '大小'}]
						break
					case 'text':
						return [{key: 'width', value: parseInt(this.element.style.width) || 0, cn: '宽度'}]
						break
					case 'img':
						return [{
							key: 'width', value: parseInt(this.element.style.width) || 0, cn: '宽度'
						}, {
							key: 'height', value: parseInt(this.element.style.height) || 0, cn: '高度'
						}]
						break
					case 'geometry':
						return [] // right now....
						break
					case 'background':
						return []
						break
				}
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
