import Store from './Store.js'
import Func from '../helper/func.js'
// 由 Editor.vue 调用
class EditorAction {
	construtor() {
		copyElement = null
	}
	/*
		添加画布元素
		@type -> geometric / icon / img / text
		@c    -> the className or 
	*/
	addElement(type, c) {
		switch (type) {
			case 'geometric':
				Store.addElement(geometricTemplate(c))
			break
			case 'icon':
				Store.addElement(iconTemplate(c))
			break
			case 'text':
				Store.addElement(textTemplate())
			break
			case 'line':
				Store.addElement(lineTemplate())
		}
	}
	/*
		选择画布元素并在右侧显示对应工具
		@id: json.content中的键即id
	*/
	resetElementId(id) {
		Store.resetElementId(id)
	}
	// 准备copy的元素
	preCopy(element) {
		this.copyElement = element
	}
	paste() {
		if (!this.copyElement) 
			return false
		let newElement = Func.deepCopy(this.copyElement)
		newElement.position = {
			left: parseInt(newElement.position.left)+40+'px',
			top: parseInt(newElement.position.top)+40+'px'
		}
		// this.copyElement = null
		Store.addElement(newElement)
	}
	// 删除元素
	deleteElement(key) {
		Store.deleteElement(key)
	}
	// 添加组合模板
	addGroupModule(key) {
		$.ajax({
			url: `src/data/modules/${key}.json`,
			success: function(d) {
				if (d) {
					Store.addGroupModule(d)
				} else {
					alert('what?')
				}
			}
		})
	}
}

function geometricTemplate(c) {
	return {
		"type": "geometric",
		"className": c,
    "position": {
      "left": "200px",
      "top": "200px"
    },
		"style": {},
		"option": {
			'background-color': '#D871FF'
		}
	}
}

function iconTemplate(c) {
	return {
		"type": "icon",
		"className": c,
    "position": {
      "left": "200px",
      "top": "200px"
    },
		"style": {
			"fontSize": "30px",
			color: "#FF4040"
		}
	}
}

function textTemplate() {
	return {
    "type": "text",
    "text": "填入文本",
    "position": {
      "left": "200px",
      "top": "200px"
    },
    "style": {
      "width": "200px",
      "fontFamily": "Microsoft Yahei",
      "fontSize": "15px",
      "fontWeight": 200,
      "lineHeight": "30px",
      "color": "#000"
    }
	}
}

function lineTemplate() {
	return {
    "type": "line",
    "position": {
      "left": "200px",
      "top": "200px",
    },
    "style": {
      "zIndex": 5,
      "width": "300px",
      "height": "0",
      "border-bottom-width": "2px",
      "border-bottom-style": "solid",
      "border-bottom-color": "#00CC9A",
      "border-bottom-left-radius": 0,
      "border-bottom-right-radius": 0
    }
  }
}


export default new EditorAction()