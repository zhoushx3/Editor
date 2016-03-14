<template lang="jade">
	.element-container.animated(:class="class")
		.row(v-for="item in list")
			.row-item(v-for="o in item" class="animated"
								@mouseenter="mouseenter($event)"
								@mouseleave="mouseleave($event)"
								@click="showDetail(o.type)")
				.img(:style="{'background-color': o.background }")
					img(:src="o.img", :alt="o.digest")
				p {{ o.digest }}
	component(:is="selectNest", :class.sync="nestClass")
</template>

<style lang="less" scoped>
  .element-container {
  	position: absolute;
  	top: 0;
  	bottom: 0;
  	left: 0;
  	right: 0;
  	background-color: #ECECEC;
  	overflow-x: hidden;
  	overflow-y: auto;

  	.row {
	  	display: flex;
	  	flex-direction: row;
	  	flex-wrap: wrap;
	  	justify-content: space-around;
	  	align-items: center;
	  	align-content: flex-start;
	  	// flex-flow: row wrap;
	  	.row-item {
				width: 80px;
				box-sizing: border-box;
		    margin-top: 35px;
				text-align: center;
				cursor: pointer;
				
				.img {
					display: flex;
		    	justify-content: center;
			    overflow: hidden;
					width: 100%;
					height: 80px;
			    padding: 2px;
			    border-radius: 5px;
			    margin-bottom: 10px;
			    box-shadow: 3px 3px 4px #B5B5B5;
			    
			    img {
			    	width: 50%;
			    	align-self: center;
			    }
				}
	  	}
  	}
  }
</style>


<script>
	import IconNest from './Nest/IconNest.vue'
	import PicNest from './Nest/PicNest.vue'
	import TextNest from './Nest/TextNest.vue'
	import GeometricNest from './Nest/GeometricNest.vue'

	export default {
		name: 'elementContainer',
		props: ['class'],
		data() {
			return {
				selectNest: "geometric-nest",
				// nestClass: "hidden"
				nestClass: 'bounceInLeft'
			}
		},
		computed: {
			list() {
				let o = {
					"1": [{
								type: 'icon',
								img: 'src/assets/img/icon_white.png',
								background: '#F86D6D',
								digest: 'ICON图标',
							}, {
								type: 'geometric',
								img: 'src/assets/img/geometric_white.png',
								background: 'rgb(131, 165, 234)',
								digest: '几何图形',
							}],
					"2": [{
								type: 'text',
								img: 'src/assets/img/text_white.png',
								background: 'rgb(234, 233, 43)',
								digest: '文本',
							}, {
								type: 'pic',
								img: 'src/assets/img/img_white.png',
								background: 'rgb(228, 155, 200)',
								digest: '图片',
							}]
				}
				return o		
			}
		},
		watch: {
		},
		methods: {
			mouseenter: function(event) {
				$(event.target).addClass('pulse')
			},
			mouseleave: function(event) {
				$(event.target).removeClass('pulse')
			},
			showDetail: function(type) {
				this.selectNest = type + '-nest',
				this.nestClass = 'bounceInLeft'
			}
		},
		components: {
			'icon-nest': IconNest,
			'pic-nest': PicNest,
			'text-nest': TextNest,
			'geometric-nest': GeometricNest
		},
		ready() {
		}
	}

</script>