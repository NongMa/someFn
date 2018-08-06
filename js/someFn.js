/*
 * 随机显示16进制web颜色
 */
function changeColor() {
	var rgb = [];
	for(var i = 0; i < 3; i++) {
		var value = Math.floor(Math.random() * 256).toString(16);
		value = value.length < 2 ? '0' + value : value;
		rgb.push(value);
	}
	return this.color = '#' + rgb.join('');
}

/*
 *阻止事件冒泡的兼容性写法
 */

function stopPropagation(e) {

	e = window.event || e;

	if(document.all) { //只有ie识别

		e.cancelBubble = true;

	} else {

		e.stopPropagation();

	}

}