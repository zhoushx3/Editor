import Listener from './Listener.js'

/*
	FlexEvent: 监听元素拉伸
*/
export default class FlexEvent {
	/*
		@ callback    -> mousemove回调的操作	
		@ container -> 负责监听的容器，避免使用document
		@ target    -> 保留 key clientX clientY 因为一次只有一个元素被拉伸 (一次只有一个元素被点击)
							  -> 只要有target 就拉伸，而不需要管event.target是否是点击对应的元素
		@ key       -> 以 f_ 开头的才是有拉伸功能的
	*/
	constructor(container) {
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
						direction = self.target[3],
						key  = self.target[0]

				switch (direction) {
					case 'w':
						self.target[1] = clientX
						self.callback(key, delX, 0, direction)
					break
					case 'e':
						self.target[1] = clientX
						self.callback(key, delX, 0, direction)
					break
					case 'n':
						self.target[2] = clientY
						self.callback(key, 0, delY, direction)
					break
					case 's':
						self.target[2] = clientY
						self.callback(key, 0, delY, direction)
					break
					case 'se':
						self.target[1] = clientX
						self.target[2] = clientY
						self.callback(key, delX, delY, direction)
				}
			}
		})
	}

	// 注册监听拉伸
	flex(key, clientX, clientY, direction, callback) {
		// 过滤掉 DragEvent
		// if ( key.indexOf('f_') !== 0 ) {
		// 	return
		// }
		this.target = [key, clientX, clientY, direction]
		this.callback = callback
	}
}