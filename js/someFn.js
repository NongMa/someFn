!(function () {
    if (!window.$l) {
        window.$l = {};
    };
    window.$l = {
        changeColor: function () {
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
        stopPropagation: function (e) {
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
        getType: function (o) {
            /*
             * 获取类型
             */
            var _t;
            return((_t = typeof(o)) === 'object' ? o === null && 'null' || Object.prototype.toString.call(o).slice(8, -1) : _t).toLowerCase();
        },
        cloneObject: function (myObj) {
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
        formatTime: function (date) {
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
        formatNumber: function (n) {
            /*
             *少于10自动加0前缀
             */
            n = n.toString()
            return n[1] ? n : '0' + n
        }
    }
})();












