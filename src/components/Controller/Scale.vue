<template lang="jade">
	.color-picker
		h2 更换颜色
		input(type='text')
</template>

<style lang="less">
	@import '../../less/spectrum.less';

	.color-picker {
		width: 100%;
		height: 20%;
		input {
			cursor: pointer;
		}
		.sp-replacer.sp-light .sp-dd {
			display: none;
		}
	}

	.color-picker-container {
	}
</style>

<script>
	// import 'spectrum-colorpicker' 引入没作用。。。

	export default {
	  name: 'scale-controller',
	  props: ['element'],
	  methods: {
	  	changeColor(event, color){
	  		let newColor = color ? color.toString() : 'rgba(255,255,255,0)'
	  		let type = ['icon', 'geomestric', 'background']
	  		if (type.indexOf(this.element.type) === -1 )
	  			this.element.style['color'] = newColor
	  		else 
	  			this.element.style['background-color'] = newColor
	  	}
	  },
	  computed: {
	  	color() {
	  		let type = ['icon', 'geomestric', 'background']
  			return type.indexOf(this.element.type) === -1 ?  this.element.style['color'] : this.element.style['background-color']
	  	}
	  },
	  ready() {
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
	    $(this.$el).find('input').on('change.spectrum', this.changeColor)
	    $(this.$el).find('input').on('move.spectrum', this.changeColor)

	    // $('.color-picker-container').on('keydown', e => e.stopPropagation())
	    // $('.color-picker-container').on('keyup', e => e.stopPropagation())
	  },
	  destroyed() {
	    this.spectrumObj.spectrum("destroy");
	  }
	}
</script>
