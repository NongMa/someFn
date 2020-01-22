!(function() {
	if (!window.$l) {
		window.$l = {};
	};
	window.$l = {
		changeColor: function() {
			/*
			 * 随机显示16进制web颜色
			 */
			var rgb = [];
			for (var i = 0; i < 3; i++) {
				var value = Math.floor(Math.random() * 256).toString(16);
				value = value.length < 2 ? '0' + value : value;
				rgb.push(value);
			}
			return '#' + rgb.join('');
		},
		stopPropagation: function(e) {
			/*
			 *阻止事件冒泡的兼容性写法
			 */
			e = window.event || e;
			if (document.all) { //只有ie识别
				e.cancelBubble = true;
			} else {
				e.stopPropagation();
			}
		},
		getType: function(o) {
			/*
			 * 获取类型
			 */
			var _t;
			return ((_t = typeof(o)) === 'object' ? o === null && 'null' || Object.prototype.toString.call(o).slice(8, -1) :
				_t).toLowerCase();
		},
		cloneObject: function(myObj) {
			/*
			 * 克隆对象
			 */
			if (typeof(myObj) !== 'object' || myObj === null) {
				return myObj
			}
			var myNewObj = {};
			for (var i in myObj) {
				myNewObj[i] = this.cloneObject(myObj[i]);
			}
			return myNewObj
		},
		// 将例如20190504转化为2019-05-04等格式的时间处理工具函数
		formatTimeBySep(time, tip, show) {
			tip = tip || '-';
			show = show || false;
			time = String(time);
			if (time.length !== 8) return time;
			var year = time.slice(0, 4);
			var month = time.slice(4, 6);
			var date = time.slice(6);
			if (show) {
				if (month.charAt(0) === '0') {
					month = month.charAt(1);
				}
				if (date.charAt(0) === '0') {
					date = date.charAt(1);
				}
			}
			return year + tip + month + tip + date;
		},
		formatTime: function(date) {
			/*
			 *格式化时间显示
			 */
			var that = this;
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var day = date.getDate();
			var hour = date.getHours();
			var minute = date.getMinutes();
			var second = date.getSeconds();
			return [year, month, day].map(that.formatNumber).join('/') + ' ' + [hour, minute, second].map(that.formatNumber).join(
				':');
		},
		formatNumber: function(n) {
			/*
			 *少于10自动加0前缀
			 */
			n = n.toString()
			return n[1] ? n : '0' + n
		},
		/*-------------------- Cookie操作 --------------------*/
		setCookie: function(sName, sValue, oExpires, sPath, sDomain, bSecure) {
			//-----设置Cookie-----
			var sCookie = sName + '=' + encodeURIComponent(sValue);
			if (oExpires) {
				var date = new Date();
				date.setTime(date.getTime() + oExpires * 60 * 60 * 1000);
				sCookie += '; expires=' + date.toUTCString();
			}
			if (sPath) {
				sCookie += '; path=' + sPath;
			}
			if (sDomain) {
				sCookie += '; domain=' + sDomain;
			}
			if (bSecure) {
				sCookie += '; secure';
			}
			document.cookie = sCookie;
		},
		getCookie: function(sName) {
			//-----获得Cookie值-----
			var sRE = '(?:; )?' + sName + '=([^;]*)';
			var oRE = new RegExp(sRE);
			if (oRE.test(document.cookie)) {
				return decodeURIComponent(RegExp['$1']);
			} else {
				return null;
			}
		},
		deleteCookie: function(sName, sPath, sDomain) {
			//-----删除Cookie值-----
			this.setCookie(sName, '', new Date(0), sPath, sDomain);
		},
		clearCookie: function() { //清除所有Cookie
			var cookies = document.cookie.split(";");
			var len = cookies.length;
			for (var i = 0; i < len; i++) {
				var cookie = cookies[i];
				var eqPos = cookie.indexOf("=");
				var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
				name = name.replace(/^\s*|\s*$/, "");
				document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"
			}
		},
		shuffle: function(arr) {
			//-----洗牌排序-----
			for (var i = 0; i < arr.length; i++) {
				var j = Math.floor(Math.random() * (i + 1));
				var t = arr[i];
				arr[i] = arr[j];
				arr[j] = t;
			}
			return arr;
		},
		//-----防抖-----
		debounce: function(func, delay) {
			var timer = null;
			return function(...args) {
				if (timer) {
					clearTimeout(timer)
				}
				timer = setTimeout(() => {
					func.apply(this, args)
				}, delay)
			}
		},
		//-----节流-----
		throttle: function(method, context) {
			clearTimeout(method.tId);
			method.tId = setTimeout(function() {
				method.call(context);
			}, 500);
		},
		//-----使用promise封装的ajax
		getJson: function(url) {
			var promise = new Promise(function(resolve, reject) {
				var handler = function() {
					if (this.readyState !== 4) {
						return
					}
					if (this.status == 200) {
						resolve(this.response);
					} else {
						reject(new Error(this.statusText));
					}
				};
				var xhr = null;
				if (window.XMLHttpRequest) {
					xhr = new XMLHttpRequest();
				} else {
					xhr = new ActiveXObject('Microsoft.XMLHTTP');
				}
				xhr.open('GET', url);
				xhr.onreadystatechange = handler;
				xhr.responseType = 'json';
				xhr.setRequestHeader("Accept", "application/json")
				xhr.send();
			});
			return promise;
		},
		addClass: function(el, className) {
			//添加类名
			if (this.hasClass(el, className)) {
				return
			}
			var newClass = el.className.split(' ');
			newClass.push(className);
			el.className = newClass.join(' ');
		},
		hasClass: function(el, className) {
			//判断类名是否存在
			var reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
			return reg.test(el.className);
		},
		removeClass: function(el, className) {
			//移除类名
			if (this.hasClass(el, className)) {
				var nowClass = el.className.split(' ');
				var newClass = [];
				for (var i = 0; i < nowClass.length; i++) {
					if (nowClass[i] !== className) {
						newClass.push(nowClass[i]);
					}
				}
				el.className = newClass.join(' ');
			} else {
				return
			}
		},
		getData: function(el, name, val) {
			//设置获取data-属性的值
			var prefix = 'data-'
			name = prefix + name
			if (val) {
				// 如果有 val 就添加这个 val 到 dom 中
				// name="val"
				return el.setAttribute(name, val)
			} else {
				// 没有 val ，就获取 dom 中的 name
				return el.getAttribute(name)
			}
		},

		/**
		 * @param {String} time
		 * @param {String} tip = '-'
		 * @param {Boolean} show = 'false'
		 */
		formateTime: function(time, tip, show) {
			tip = tip || '-';
			show = show || false;
			time = String(time);
			if (time.length !== 8) return time;
			var year = time.slice(0, 4);
			var month = time.slice(4, 6);
			var date = time.slice(6);
			if (show) {
				if (month.charAt(0) === '0') {
					month = month.charAt(1);
				}
				if (date.charAt(0) === '0') {
					date = date.charAt(1);
				}
			}
			return year + tip + month + tip + date;
		},

		/**
		 * 用字符分割连续的数字
		 * @param {Number} value
		 * @param {Number} s = 3
		 * @param {String} step = ','
		 * @param {Boolean} sort = false
		 * @return {String} 
		 */

		addNumberStep: function(value, sort, s, step) {
			sort = sort || false;
			s = s || 3;
			step = step || ','
			if (value && !isNaN(value) && /^-*[0-9]+$/.test(value)) {
				var regExpValue = new RegExp('(\\d{' + s + '})(?=\\d)', 'g');
				if (sort) {} else {
					return String(value).split('').reverse().join('').replace(regExpValue, '$1' + step).split('').reverse().join('')
					return String(value).replace(regExpValue, '$1' + step)
				}

			} else {
				throw ('参数异常')
			}
		},

		/** 
		 * 用","格式化金额
		 * @param {Number | String} n 
		 * @param {Number | null} s
		 * @return {String}
		 */
		formatMoney: function(n, s) {
			if (isNaN(n)) {
				return n
			} else {
				var newValue;
				if (s && s > 0 && Number.isInteger(s)) {
					newValue = (+n).toFixed(s);
					var newValueArr = String(newValue).split('.');
					newValueArr[0] = addNumberStep(newValueArr[0], true);
					newValue = newValueArr.join('.');
				} else {
					if (String(n).indexOf('.') > -1) {
						var newValueArr = String(n).split('.');
						newValueArr[0] = addNumberStep(newValueArr[0], true);
						newValue = newValueArr.join('.');
					} else {
						newValue = addNumberStep(n, true);
					}
				}
				return newValue;
			}
		}
	}
})();
