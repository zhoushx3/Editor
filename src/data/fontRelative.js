export var fontFamily = [{
		name: "宋体",
		family: "SimSun"
	}, {
		name: "黑体",
		family: "SimHei"
	}, {
		name: "微软雅黑",
		family: "Microsoft YaHei"
	}, {
		name: "微软正黑体",
		family: "Microsoft JhengHei"
	}, {
		name: "新宋体",
		family: "NSimSun"
	}, {
		name: "新细明体",
		family: "PMingLiU"
	}, {
		name: "细明体",
		family: "MingLiU"
	}, {
		name: "标楷体",
		family: "DFKai-SB"
	}, {
		name: "仿宋",
		family: "FangSong"
	}, {
		name: "楷体",
		family: "KaiTi"
	}, {
		name: "仿宋_GB2312",
		family: "FangSong_GB2312"
	}, {
		name: "楷体_GB2312",
		family: "KaiTi_GB2312"
	}]

export var fontSize = (() => {
	let fs = []
	for (let s = 12; s < 31; s += 1)
		fs.push(s+'px')
	return fs
})()

export var lineHeight = (() => {
	let lh = []
	for (let s = 1; s < 2.5; s += 0.1)
		lh.push(s)
	return lh
})()