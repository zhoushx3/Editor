var fakeData = {
  "content": {
    "1": {
      "type": "text",
      "text": "奋斗史就是发的刻录机",
      "position": {
        "left": "10px",
        "top": "10px"
      },
      "style": {
        "width": "200px",
        "fontFamily": "Microsoft Yahei",
        "fontSize": "10px",
        "fontWeight": 200,
        "lineHeight": "10px",
        "color": "#aaa"
      }
    },
    "2": {
      "type": "img",
      "position": {
        "left": "30px",
        "top": "30px"
      },
      "style": {
        "width": "100px",
        "height": "100px",
        "transform": "none",
        "opacity": 1
      },
      "src": "build/node.png",
      "alt": "图一"
    },
    "3": {
      "type": "icon",
      "className": "icon-iconfontfav",
      "position": {
        "left": "40px",
        "top": "100px"
      },
      "style": {
        "fontSize": "30px"
      }
    }
  },
  "contentNum": 3
}

export default fakeData

/*
	json格式注意：
1. 最后一个属性后面不能加逗号
2. Key 也需要加引号
2. 属性值除 数字 和 bool 外都得加引号

像素值统一存为整型
px(n => n+'px') 

*/
