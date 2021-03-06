import Store from './Store.js'
import Func from '../helper/func.js'
// 由 Editor.vue 调用
class ElementAction {
	construtor() {}

 	drag(elementId, eventX, eventY) {
 		let self = this

		window.dragEvent.drag(elementId, eventX, eventY, (elementId, delX, delY) => {
			let ele = Store.selectElement
			let originPosition = ele['position']

			originPosition.left = parseInt(originPosition.left) + delX + 'px'
			originPosition.top = parseInt(originPosition.top) + delY + 'px'
			Store.setElement(ele)
		})
	}
	// 拉伸元素
 	flex(elementId, eventX, eventY, direction) {
 		let self = this

		window.flexEvent.flex(elementId, eventX, eventY, direction, (elementId, delX, delY, direction) => {
			self._processFlex(delX, delY, direction)
		})
	}
	// 处理拉伸
	_processFlex(delX, delY, direction) {
		// 伸缩设置最小宽度、最小高度
		let minW = 10
		let minH = 10

		let ele = Object.assign({}, Store.selectElement)
		
		let originPosition = ele['position']
		let originStyle = ele['style']

		let left = parseInt(originPosition['left'])
		let top = parseInt(originPosition['top'])
		let width = parseInt(originStyle['width'])
		let height = parseInt(originStyle['height'])

		switch (direction) {
			case 'w':
				originPosition['left'] = Func.px ( Func.upper( left + delX, left + width - minW ) )
				originStyle['width'] = Func.px ( Func.lower( width - delX, minW ) )
			break
			case 'e':
				originStyle['width'] = Func.px ( Func.lower( width + delX, minW ) )
			break
			case 'n':
				originPosition['top'] = Func.px ( Func.upper( top + delY, top + height - minH ) )
				originStyle['height'] = Func.px ( Func.lower ( height - delY, minH ) )
			break
			case 's':
				originStyle['height'] = Func.px ( Func.lower( height + delY, minH ) )
			break
			case 'se':
				if (ele.type === 'icon') {
					let fontSize = parseInt(originStyle['fontSize'])
					let factor = 0.8
					if (delX < 0 || delY < 0)
						factor = -0.6
					originStyle['fontSize'] = Func.px(Func.lower(10, fontSize + factor * Func.gouGu(delX, delY)))
				} else if (ele.type === 'geometric' || ele.type === 'pie') {
					let option = ele['option']
					width = option.width ? parseInt(option.width) : 24
					option['width'] = option['height'] = Func.px ( Func.lower( width + delX, minW ) )
				}
			break
		}
		Store.setElement(ele)
	}
	// 设置样式
	// value: 新值
	setStyle(property, value) {
		let ele = Object.assign({}, Store.selectElement)
		console.log(property, value)
		// let ele = Store.selectElement 会导致新添加的属性vue无法跟踪，原因是ele跟Store.selectElement指向同一引用，而Vue观察的引用对象增加属性时是不会觉察到的，所以新建一个ele，然后后面this.json.content[this.selectid] = newElement再重新赋值新的引用对象，Vue就能察觉到了
		switch ( property ) {
			case 'letterSpacing':
			case 'lineHeight':
			case 'fontSize':
			case 'height':
			case 'width':
			case 'border-bottom-width':
			case 'border-bottom-left-radius':
			case 'border-bottom-right-radius':
				ele.style[property] = ( value || 0 ) + 'px'
				break
			case 'text':
				ele.text = value ? value.substr(0, 250) : ''
				break
			case 'opacity':
				ele.style[property] = value/100
				break
			case 'rotate':
				ele.style['transform'] = `rotate(${value}deg)`
				break
			// case 'scale':
			// 	ele.option['transform'] = `scale(${value})`
			// 	break
			case 'zIndex':
			case 'color':
			case 'textAlign':
			case 'border-bottom-style':
			case 'border-bottom-color':
			case 'fontWeight':
				ele.style[property] = value
				break
			case 'left':
			case 'top':
				ele.position[property] = ( value || 0 ) + 'px'
				break
			case 'background-color':
				// 给geometric使用的
				if (ele.type === 'geometric')
					ele.option[property] = value
				else
					ele.style[property] = value
				break
			case 'widthHeight':
			// 给geometric 和 pie 使用的
				ele.option['width'] = ( value || 0) + 'px'
				ele.option['height'] = ( value || 0) + 'px'
				break
			case 'back-color':
			case 'front-color':
			case 'success-color':
			// 给 pie用
				ele.option[property] = value
			break

		}
		Store.setElement(ele) // 重点是为了让 store 通知更新 View 
	}
}

export default new ElementAction()