export function px(n) {
	return (typeof n === 'number' || typeof n === 'string') ? parseInt(n)+'px' : 0
}

export function lower(n, limit) {
	return n <= limit ? limit : n
}

export function upper(n, limit) {
	return n <= limit ? n : limit
}
// 勾股定理
export function gouGu(x, y) {
	return Math.sqrt( Math.pow(x, 2) + Math.pow(y, 2))
}