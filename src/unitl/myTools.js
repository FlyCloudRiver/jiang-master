/*
 * 公用方法
 *
 * */


export default {
			/*
   * 验证邮编
   *
   * */
  regInputZipCode(rule, value, callback) {
	if (value === ""||value == null) {
		callback(new Error("请输入邮编"));
	} else {
		if (/^[1-9][0-9]{5}$/.test(value)) {
			callback();
		} else {
			callback(new Error("请输入正确格式"));
		}
	}
},
		/*
   * 验证金额
   *
   * */
  regInputMoney(rule, value, callback) {
	if (value === "") {
		callback(new Error("请输入整数或保留两位小数"));
	} else {
		if (/^([0-9]\.\d{2}|[1-9][0-9]*\.\d{2}|[1-9]|[1-9][0-9]*)$/.test(value)) {
			callback();
		} else {
			callback(new Error("请输入整数或保留两位小数"));
		}
	}
},
  //验证地址
  addressrul(rule,value,callback){
    console.log(value)
    if(value.length>0){
      callback();
    }else{
      callback(new Error("请选择地址"))
    }
  },
		/*
   * 验证百分比
   *
   * */
  regInputPercentage(rule, value, callback) {
	if (value === "") {
		callback(new Error("请输入100以内整数或保留两位小数"));
	} else {
		if (/^([0-9]\.\d{2}|[1-9][0-9]\.\d{2}|[1-9]|[1-9][0-9])$/.test(value)) {
			callback();
		} else {
			callback(new Error("请输入100以内整数或保留两位小数"));
		}
	}
},

	/*
   * 验证手机号
   *
   * */
	regInputPhone(rule, value, callback) {
		if (value === ""||value == null) {
			callback(new Error("请输入手机号"));
		} else {
			if (/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(value)) {
				callback();
			} else {
				callback(new Error("请输入正确格式"));
			}
		}
	},
	/*
* 验证邮箱手机号
*
* */
	regInputEmail(rule, value, callback) {
		if (value === ""||value == null) {
			callback(new Error("请输入邮箱"));
		} else {
			if (/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value)) {
				callback();
			} else {
				callback(new Error("请输入正确格式"));
			}
		}
	},
	/*
	 * 验证是否为整数
	 *
	 * */

	regNumber(self, val, mes) {
		let reg = /^\d+$/;
		if (!reg.test(val)) {
			self.$message.error(mes);
			return false;
		}
		return true;
	},

	/*
	 * 验证是否是浮点数
	 *
	 * */

	regFloatNumber(self, val, mes) {

		let reg = /^(-?\d+)(\.\d+)?$/;

		if (!reg.test(val)) {
			self.$message.error(mes);
			return false;
		}

		return true;
	},

	/*
	 * 验证手机号
	 *
	 * */

	regPhone(self, val, mes) {
		// let reg=/^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[678]|166|198|199)[0-9]{8}$/;

		let reg = /^\d+$/;

		if (!reg.test(val)) {
			self.$message.error(mes);
			return false;
		}

		return true;
	},

	/*
	 * regNull 判断是否为空
	 * */

	regNull(self, val, mes) {
		if (!val) {
			self.$message.error(mes);
			return false;
		}
		return true;
	},

	/*
	 * regEmail 判断是否为邮箱
	 * */

	regEmail(self, val, mes) {
		let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

		if (!reg.test(val)) {
			self.$message.error(mes);
			return false;
		}

		return true;
	},
	/*
	 * regPost判断是否为邮编
	 * */

	regPost(self, val, mes) {
		let reg = /^[0-9][0-9]{5}$/;

		if (!reg.test(val)) {
			self.$message.error(mes);
			return false;
		}

		return true;
	},

	/*
	 * regIdCard 验证身份证
	 * */

	regIdCard(self, val, mes) {
		let reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;

		if (!reg.test(val)) {
			self.$message.error(mes);
			return false;
		}

		return true;
	},

	/*
	 * 排序方法
	 *
	 * */

	pageSort(a, b, prop) {
		let curA = a[prop] == '-' ? 9999999 : a[prop];
		let curB = b[prop] == '-' ? 9999999 : b[prop];

		if (typeof Number(a[prop]) == 'number' && !isNaN(Number(a[prop])) && typeof Number(b[prop]) == 'number' && !isNaN(Number(b[prop]))) {
			//数字排序
			return curA - curB;
			return -1
		} else {
			//非数字排序

			let tempA = typeof a[prop] == 'number' ? a[prop].toString() : a[prop];
			let tempB = typeof b[prop] == 'number' ? b[prop].toString() : b[prop];
			tempA = tempA ? tempA : '';
			tempB = tempB ? tempB : '';

			return tempA.localeCompare(tempB);
		}
	},

	/*
	 * 验证登录状态
	 * */

	regIsLogin(self) {
		let store_name = localStorage.getItem('store_name');
		let store_loginId = localStorage.getItem('store_login_id');
		if (store_loginId && store_name) {
			return false;
		} else {
			return false;
		}
	},

	/*
	 * get url 处理
	 * */

	handleUrlParams(obj) {
		let params = '',
			count = 0;

		Object.keys(obj).forEach((key, index) => {
			let value = obj[key]
			// 如果值为undefined我们将其置空
			if (typeof value === 'undefined' || value === '') {
				value = ''
			} else {
				count++;
				params += count == 1 ? `?${key}=${value}` : `&${key}=${value}`
			}
		})

		return params;
	},

	/*
	 * 更新路由
	 *
	 * */

	updateRouter(self) {
		let path = self.$route.path.split('/')[2];
		localStorage.setItem('store_path', path);
	},

	/**
	 * 获取 cookie 的值
	 * @param {String} name - cookie的name
	 * @returns {String | null}
	 */
	getCookie(name) {
		let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		if ((arr = document.cookie.match(reg))) {
			return unescape(arr[2]);
		} else {
			return null;
		}
	},

	/*
	 * 状态类型枚举
	 *
	 * */
	getValueByObj(obj, value) {
		var result = '';
		Object.keys(obj).map((v, k) => {
			if (v == value) {
				result = obj[v];
			}
		})
		return result;
	},
	/*
	    时间转时间戳
	*/
	getTimeStamp(date) {
		return date ? date.getTime() : '-';
	},
	/*
	时间戳转时间
*/
	timestampToTime(timestamp) {
		var date = new Date(timestamp);
		var Y = date.getFullYear() + "-";
		var M =
			(date.getMonth() + 1 < 10
				? "0" + (date.getMonth() + 1)
				: date.getMonth() + 1) + "-";
		var D = date.getDate() + " ";
		var h = (date.getHours()<10?'0' + date.getHours() : date.getHours()) + ":";
		var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ":";
		var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
		return Y + M + D + h + m + s;
	},
	/*
	    时间格式化，传new Date对象
	*/
	formateDate(dateObj, format = "yyyy-MM-dd") {
		if (Object.prototype.toString.call(dateObj) != '[object Date]') {
			dateObj = new Date(dateObj)
		}
		var date = {
			"M+": dateObj.getMonth() + 1,
			"d+": dateObj.getDate(),
			"h+": dateObj.getHours(),
			"m+": dateObj.getMinutes(),
			"s+": dateObj.getSeconds(),
			"q+": Math.floor((dateObj.getMonth() + 3) / 3),
			"S+": dateObj.getMilliseconds()
		};
		if (/(y+)/i.test(format)) {
			format = format.replace(RegExp.$1, (dateObj.getFullYear() + '').substr(4 - RegExp.$1.length));
		}
		for (var k in date) {
			if (new RegExp("(" + k + ")").test(format)) {
				format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
			}
		}
		return format;
	},

	getTimeQuery(dateObj = new Date()) {
		var date = {
			"year": dateObj.getFullYear(),
			"month": (dateObj.getMonth() + 1) < 10 ? "0" + (dateObj.getMonth() + 1) : dateObj.getMonth() + 1,
			"day": dateObj.getDate() < 10 ? "0" + (dateObj.getDate()) : dateObj.getDate(),
			"hours": dateObj.getHours() < 10 ? "0" + dateObj.getHours() : dateObj.getHours(),
			"minute": dateObj.getMinutes() < 10 ? "0" + dateObj.getMinutes() : dateObj.getMinutes(),
			"s+": dateObj.getSeconds(),
			"q+": Math.floor((dateObj.getMonth() + 3) / 3),
			"S+": dateObj.getMilliseconds()
		}

		return date
	},
	/*
	    对象数组去重
	*/
	duplicate(arr, key) {
		var hash = {};
		var result = arr.reduce(function (item, next) {
			hash[next[key]] ? '' : hash[next[key]] = true && item.push(next);
			return item;
		}, []);
		return result
	},
	/**
     * 文件转base64
     * @param file - 文件
     * @returns {String | null}
     * 转base64方法
     */
	getBase64: function (file) {
		return new Promise(function (resolve, reject) {
			let reader = new FileReader();
			reader.readAsDataURL(file);
			reader.addEventListener("load", function () {
				resolve(reader.result);
			});
			reader.addEventListener("error", function (error) {
				reject(error);
			});
		});
	},
	//获取url后面的参数
	getUrlKey: function (name) {
		return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
	}
};
