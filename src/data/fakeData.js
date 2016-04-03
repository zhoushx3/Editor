var fakeData = {
  "content": {
    "0": {
      "type": "background",
      "position": {
        "left": 0,
        "right": 0,
        "top": 0,
        "bottom": 0
      },
      "style": {
        "background-color": "#fff",
        "zIndex": 0
      }
    },
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
        "color": "#000",
        "zIndex": 1
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
        "opacity": 1,
        "zIndex": 2
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
        "fontSize": "30px",
        "zIndex": 3,
        "color": "#FF4040",
      }
    },
    "4": {
      "type": "geometric",
      "className": "g-moon",
      "position": {
        "left": "200px",
        "top": "200px"
      },
      "style": {
        "zIndex": 4
      }
    }
  },
  "contentNum": 5
}
// key 暂时不用"0"

export default fakeData

/*
	json格式注意：
1. 最后一个属性后面不能加逗号
2. Key 也需要加引号
2. 属性值除 数字 和 bool 外都得加引号

像素值统一存为整型
px(n => n+'px') 

*/
