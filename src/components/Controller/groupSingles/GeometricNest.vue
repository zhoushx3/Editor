<template lang="jade">
	#geometric-nest.animated(:class="class")
		.shape-container
			.shape.animated(v-for="(key, shape) in cssShape" 
											@dblclick.stop.prevent="selectShape(shape)"
											@mouseenter="mouseenter",
											@mouseleave="mouseleave")
				div(:class="shape")
		p.warning ! 双击选择
		img.return(:src="returnImg", alt="返回" @click="returnTo")
</template>

<style lang="less" scoped>
	@import '../../../less/variable.less';

	#geometric-nest {
  	position: absolute;
  	top: 0;
  	bottom: 0;
  	left: 0;
  	right: 0;
  	background-color: #ECECEC;
  	overflow-x: hidden;
  	overflow-y: auto;
  	z-index: @nest-zIndex;

  	.shape-container {
  		width: 100%;
			display: flex;
	  	justify-content: space-around;
			align-items: flex-start;
			align-content: flex-start;
	  	flex-wrap: wrap;

	  	.shape {
		    background-color: #fff;
		    box-shadow: 1px 0px 4px #8A5885;
		    width: 60px;
		    height: 60px;
		    display: flex;
		    justify-content: center;
		    align-items: center;
		    cursor: pointer;
		    border-radius: 50%;
		    margin: 10px 5px;
	  	}
  	}
  
  	.warning {
  		color: #f00;
  		font-size: 12px;
  		margin: 10px;

  	}

  	.return {
  		position: absolute;
  		bottom: 10px;
  		left: 50%;
  		width: 30px;
  		margin-left: -15px;
  		cursor: pointer;
  	}
	}
</style>

<script>
	import cssShape from '../../../data/cssShape.js'
	import EditorAction from '../../../Action2Store/EditorAction.js'

	export default {
		name: 'geometric-nest',
		props: ['class'],
		data() {
			return {
				returnImg: 'src/assets/img/return.png',
				cssShape: cssShape
			}
		},
		computed: {
		},
		methods: {
			mouseenter: function(event) {
				$(event.target).addClass('rubberBand')
			},
			mouseleave: function(event) {
				$(event.target).removeClass('rubberBand')
			},
			selectShape(shape) {
				EditorAction.addElement('geometric', shape)
			},
			returnTo() {
				// 修改props 双向
				this.class = "bounceOutLeft"
			}
		},
		components: {
		},
		watch: {
		},
		ready: function() {
      $('#geometric-nest').niceScroll({
        cursorcolor: '#d6d6d6',
        railalign: 'right',
        horizrailenabled: false,
        cursoropacitymin:0,
        autohidemode: false
      })
		}
	}
</script>