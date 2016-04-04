<template lang="jade">
	#group-group.animated
		.row-item(v-for="o in list" class="animated")
			.label(:class="showList[o['key']] ? 'active' : ''", @click="showDetail(o['key'])") {{ o['cn'] }}
			.detail-container(v-show="showList[o['key']]")
				.row-detail.animated(v-for="x in o['module']",
										@mouseenter="mouseenter",
										@mouseleave="mouseleave")
</template>

<style lang="less" scoped>
  #group-group {
  	position: absolute;
  	top: 0;
  	bottom: 0;
  	left: 0;
  	right: 0;
  	background-color: #ECECEC;
  	overflow-x: hidden;
  	overflow-y: auto;
  	.row-item {
  		width: 100%;
  		border-bottom: 1px solid #00CC9A;
  		border-collapse: collapse;

  		.label {
	  		color: #00CC9A;
	  		line-height: 30px;
	  		text-align: center;
	  		background-color: #fff;
	  		cursor: pointer;

	  		&.active {
	  			color: #fff;
		  		height: 30px;
	  			background-color: #00CC9A;
	  		}
  		}
  		.detail-container {
	  		display: flex;
	  		flex-wrap: wrap;
	  		justify-content: center;

	  		.row-detail {
	  			width: 80%;
	  			height: auto;
	  			min-height: 30px;
	  			border: 1px solid #aaa;
	  			box-shadow: 0 0 10px #bbb;
	  			margin: 10px;
	  			cursor: pointer;
	  			&.hover {
	  				border-color: #00CC9A;
	  			}
	  		}
  		}
  	}
  }
</style>


<script>
	import EditorAction from '../../Action2Store/EditorAction.js'
	import Modules from '../../data/CombinationModules.js'

	export default {
		name: 'groupGroup',
		data() {
			return {
				showList: {
					'header': true,
					'content': false,
					'other': false
				}
			}
		},
		computed: {
			list() {
				return [{
					'key': 'header', 'cn': '头部', 'module': Modules['header']
				}, {
					'key': 'content', 'cn': '内容', 'module': Modules['content']
				}, {
					'key': 'other', 'cn': '其他', 'module': Modules['other']
				}]
			},
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
				let showList = this.showList
				for (let o in showList) {
					showList[o] = type === o
				}
			}
		},
		ready() {
      $('#group-group').niceScroll({
        cursorcolor: '#d6d6d6',
        railalign: 'right',
        horizrailenabled: false,
        cursoropacitymin:0,
        autohidemode: false
      })
		}
	}

</script>