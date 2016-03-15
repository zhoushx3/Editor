<template lang="jade">
	.container
		label 字体类型
		select(v-model="selectFont")
			option(v-for="o in fontFamily", :value="o.family") {{ o.name }}
</template>

<style lang="less">

</style>


<script>
	import ColorPicker from 'spectrum-colorpicker'
	import fontFamily from '../../data/fontFamily.js'

	export default {
		name: 'font-controller',
		// props: [],
		data() {
			return {
				fontFamily: fontFamily,
				selectFont: 'SimSun'
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