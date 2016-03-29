import Listener from './Listener.js'

/*
	FlexEvent: 监听元素拉伸
*/
export default class FlexEvent {
	/*
		@ flexCB    -> mousemove回调的操作	
		@ container -> 负责监听的容器，避免使用document
		@ target    -> 保留 key clientX clientY 因为一次只有一个元素被拉伸 (一次只有一个元素被点击)
							  -> 只要有target 就拉伸，而不需要管event.target是否是点击对应的元素
		@ key       -> 以 f_ 开头的才是有拉伸功能的
	*/
	constructor(flexCB, container) {
		this.flexCB = flexCB
		this.container = container
		this.target = []
		this.init()
	}

	init() {
		let self = this

		Listener(this.container, 'mouseup', (event)=>{
			self.target.length = 0
		})

		Listener(this.container, 'mousemove', (event)=>{
			if ( self.target.length  ) {

				let clientX = event.clientX,
						clientY = event.clientY,
						delX = clientX - self.target[1],
						delY = clientY - self.target[2],
						type = self.target[3],
						key  = self.target[0]

				switch (type) {
					case 'left':
						self.target[1] = clientX
						self.flexCB(key, delX, 0, type)
					break
					case 'right':
						self.target[1] = clientX
						self.flexCB(key, delX, 0, type)
					break
					case 'top':
						self.target[2] = clientY
						self.flexCB(key, 0, delY, type)
					break
					case 'bottom':
						self.target[2] = clientY
						self.flexCB(key, 0, delY, type)
					break
					case 'se':
						self.target[1] = clientX
						self.target[2] = clientY
						self.flexCB(key, delX, delY, type)
				}
			}
		})
	}

	// 注册监听拉伸
	register(key, clientX, clientY, type) {
		// 过滤掉 DragEvent
		if ( key.indexOf('f_') !== 0 ) {
			return
		}
		this.target = [key, clientX, clientY, type]
	}
}