<template lang="jade">
	.flex-box.color
		label 更换颜色
		input(type='text')
</template>

<style lang="less" scoped>
	@import '../../../less/variable.less';

	.flex-box.color {
		width: 100%;
		justify-content: flex-start;

		label {
			width: 24%;
		}
	}

	input {
		cursor: pointer;
	}
	.sp-replacer.sp-light .sp-dd {
		display: none;
	}

	.color-picker-container {
	}
</style>

<script>
	import '../../../assets/js/spectrum.css'
	import '../../../assets/js/spectrum.js'
	import ElementAction from '../../../Action2Store/ElementAction.js'

	export default {
	  name: 'color-controller',
	  props: ['element', 'selectid'],
	  computed: {
	  	colorType() {
	  		let type = ['icon', 'text']
	  		return type.indexOf(this.element.type) !== -1 ? 'color' : 'background-color'
	  	},
	  	color() {
  			return this.element.style[this.colorType]
	  	}
	  },
	  methods: {
	  	init() {
	    	this.spectrumObj && this.spectrumObj.spectrum("destroy");
		    this.spectrumObj = $(this.$el).find('input').spectrum({
		      color: this.color,
		      showInput: true,
		      showAlpha: true,
		      allowEmpty: true,
		      showPalette: false,
		      containerClassName: 'color-picker-container',
		      preferredFormat: 'hex',
		      showButtons: false,
		      clickoutFiresChange: true,
		    })
		    $(this.$el).find('input').on('dragstart.spectrum', this.changeColor)
		    $(this.$el).find('input').on('dragstop.spectrum', this.changeColor)
		    $(this.$el).find('input').on('change.spectrum', this.fileChange)
		    $(this.$el).find('input').on('move.spectrum', this.changeColor)
	  	},
	  	changeColor(event, color){
	  		let newColor = color ? color.toString() : 'rgba(255,255,255,0)'
  			ElementAction.setStyle(this.colorType, newColor)
	  	},
	  	fileChange() {
	  	// clickoutFiresChange时触发, 如果在修改A的时候点击B，会有bug，因为选中了B修改了Store.selectElement,接着ElementAction.setStyle所做的修改就传到了B去了
	  		return false
	  	}
	  },
	  watch: {
	  	selectid: function() {
	  		this.init()
	  		console.log(this.color)
	  	}
	  },
	  ready() {
	  	this.init()
	    // $('.color-picker-container').on('keydown', e => e.stopPropagation())
	    // $('.color-picker-container').on('keyup', e => e.stopPropagation())
	  },
	  destroyed() {
	    this.spectrumObj.spectrum("destroy");
	  }
	}
</script>
