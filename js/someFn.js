!(function() {
		if(!window.$l) {
			window.$l = {};
		};
		window.$l = {
			changeColor: function() {
				/*
				 * 随机显示16进制web颜色
				 */
				var rgb = [];
				for(var i = 0; i < 3; i++) {
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
				if(document.all) { //只有ie识别
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
				return((_t = typeof(o)) === 'object' ? o === null && 'null' || Object.prototype.toString.call(o).slice(8, -1) : _t).toLowerCase();
			},
			cloneObject: function(myObj) {
				/*
				 * 克隆对象
				 */
				if(typeof(myObj) !== 'object' || myObj === null) {
					return myObj
				}
				var myNewObj = {};
				for(var i in myObj) {
					myNewObj[i] = this.cloneObject(myObj[i]);
				}
				return myNewObj
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
				return [year, month, day].map(that.formatNumber).join('/') + ' ' + [hour, minute, second].map(that.formatNumber).join(':');
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
				if(oExpires) {
					var date = new Date();
					date.setTime(date.getTime() + oExpires * 60 * 60 * 1000);
					sCookie += '; expires=' + date.toUTCString();
				}
				if(sPath) {
					sCookie += '; path=' + sPath;
				}
				if(sDomain) {
					sCookie += '; domain=' + sDomain;
				}
				if(bSecure) {
					sCookie += '; secure';
				}
				document.cookie = sCookie;
			},
			getCookie: function(sName) {
				//-----获得Cookie值-----
				var sRE = '(?:; )?' + sName + '=([^;]*)';
				var oRE = new RegExp(sRE);
				if(oRE.test(document.cookie)) {
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
				for(var i = 0; i < len; i++) {
					var cookie = cookies[i];
					var eqPos = cookie.indexOf("=");
					var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
					name = name.replace(/^\s*|\s*$/, "");
					document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"
				}
			},
			shuffle: function(arr) {
				//-----洗牌排序-----
				for(var i = 0; i < arr.length; i++) {
					var j = Math.floor(Math.random() * (i + 1));
					var t = arr[i];
					arr[i] = arr[j];
					arr[j] = t;
				}
				return arr;
			},
			debounce: function(func, delay) {
				//-----截流函数1-----
				var timer = null;
				return function(...args) {
					if(timer) {
						clearTimeout(timer)
					}
					timer = setTimeout(() => {
						func.apply(this, args)
					}, delay)
				}
			},
			throttle: function(method, context) {
				//-----截流函数2-----
				clearTimeout(method.tId);
				method.tId = setTimeout(function() {
					method.call(context);
				}, 500);
			},
			getJson: function(url) {
				//-----使用promise封装的ajax
				const promise = new Promise(function(resolve, reject) {
					const handler = function() {
						if(this.readyState !== 4) {
							return
						} 						
						if(this.status == 200){
							resolve(this.response);
						}
						else {
							reject(new Error(this.statusText));
						}						
					};
					let xhr = null;
					if(window.XMLHttpRequest) {
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
			removeClass: function(el, className){
			  //移除类名
			  if (this.hasClass(el, className)) {
			    var nowClass = el.className.split(' ');
			    var newClass = [];
			    for(var i=0;i<nowClass.length;i++){
			    	if(nowClass[i]!==className){
			    		newClass.push(nowClass[i]);
			    	}
			    }
			    el.className = newClass.join(' ');
			  }else{
			  	return
			  }	
           }
		}
	})();