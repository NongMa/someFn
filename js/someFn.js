function changeColor() {
	var rgb = [];
	for(var i = 0; i < 3; i++) {
		var value = Math.floor(Math.random() * 256).toString(16);
		value = value.length < 2 ? '0' + value : value;
		rgb.push(value);
	}
	return this.color = '#' + rgb.join('');
}