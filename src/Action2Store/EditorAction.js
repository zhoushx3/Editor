import Store from './Store.js'

// 由 Editor.vue 调用
class EditorAction {
	construtor() {}
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
		}
	}
	/*
		选择画布元素并在右侧显示对应工具
		@id: json.content中的键即id
	*/
	resetElementId(id) {
		Store.resetElementId(id)
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
			"fontSize": "30px"
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
      "color": "#aaa"
    }
	}
}


export default new EditorAction()