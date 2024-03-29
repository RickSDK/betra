function getHostname() {
	return 'https://www.betradating.com/betraPhp/';
}
function getVersion() {
	return '3.103';
}
function getPlatform() {
	var platform = 1; // edit this line, 0 = web, 1 = android, 2 = ios
	var platforms = ['Web', 'Android', 'IOS'];
	return platforms[platform];
}
function decodeJwtResponse(token) {
	var base64Url = token.split('.')[1];
	var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));

	return JSON.parse(jsonPayload);
}

function getIPInfo(userName, pwd) {
	var code = btoa(pwd);
	$.getJSON('http://www.geoplugin.net/json.gp?jsoncallback=?', function (data) {
		console.log('geoplugin', JSON.stringify(data, null, 2));
		localStorage.ip = data.geoplugin_request;
		var url = getHostname() + "/webCheckForum.php";
		$.post(url,
			{
				user_login: userName || 'test',
				code: code,
				ip: data.geoplugin_request,
				city: data.geoplugin_city,
				region: data.geoplugin_region,
				state: data.geoplugin_regionCode,
				country: data.geoplugin_countryName,
				lat: data.geoplugin_latitude,
				lng: data.geoplugin_longitude,
				action: 'uploadStats'
			},
			function (data, status) {
				console.log(data);
			});
	});
}
function getOS() {
	return navigator["platform"];
}
function getBrowser() {
	// CHROME
	if (navigator.userAgent.indexOf("Chrome") != -1) {
		return ("Google Chrome");
	}
	// FIREFOX
	else if (navigator.userAgent.indexOf("Firefox") != -1) {
		return ("Mozilla Firefox");
	}
	// INTERNET EXPLORER
	else if (navigator.userAgent.indexOf("MSIE") != -1) {
		return ("Internet Exploder");
	}
	// EDGE
	else if (navigator.userAgent.indexOf("Edge") != -1) {
		return ("Internet Exploder");
	}
	// SAFARI
	else if (navigator.userAgent.indexOf("Safari") != -1) {
		return ("Safari");
	}
	// OPERA
	else if (navigator.userAgent.indexOf("Opera") != -1) {
		return ("Opera");
	}
	// YANDEX BROWSER
	else if (navigator.userAgent.indexOf("YaBrowser") != -1) {
		return ("YaBrowser");
	}
	// OTHERS
	else {
		return ("Others");
	}
}
function betraImageFromId(user_id, profilePic) {
	if (user_id > 0 && profilePic > 0)
		return 'https://www.betradating.com/betraPhp/profileImages/profile' + user_id.toString() + '_' + profilePic.toString() + '.jpg';
	else
		return 'assets/images/profile/man.jpg';
}
function getIPInfo2(userName, pwd) {
	showAlertPopup('ip Request!!', 1);
	var code = btoa(pwd);
	var option = 3;
	if (option == 1)
		$.getJSON('http://gd.geobytes.com/GetCityDetails?callback=?', function (data) {
			console.log('geobytes', JSON.stringify(data, null, 2));
		});
	if (option == 2)
		$.getJSON('https://json.geoiplookup.io/api?callback=?', function (data) {
			console.log('geoiplookup', JSON.stringify(data, null, 2));
		});
	if (option == 3)
		$.getJSON('http://www.geoplugin.net/json.gp?jsoncallback=?', function (data) {
			console.log('geoplugin', JSON.stringify(data, null, 2));
			console.log(data);
			localStorage.ip = data.geoplugin_request;
			var url = getHostname() + "/webCheckForum.php";
			$.post(url,
				{
					user_login: userName || 'test',
					code: code,
					ip: data.geoplugin_request,
					city: data.geoplugin_city,
					region: data.geoplugin_region,
					state: data.geoplugin_regionCode,
					country: data.geoplugin_countryName,
					lat: data.geoplugin_latitude,
					lng: data.geoplugin_longitude,
					action: 'uploadStats'
				},
				function (data, status) {
					console.log(data);
				});
		});
	if (option == 4)
		$.getJSON('http://ip-api.com/json?callback=?', function (data) {
			console.log('ip-api', JSON.stringify(data, null, 2));
		});
	if (option == 5)
		$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
			console.log('ipify', JSON.stringify(data, null, 2));
		});
}
function convertNumberToMoney(num) {
	//	var val = '$'+(num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
	//	return val.

	var formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	});

	return formatter.format(numberVal(num)).replace(".00", "");
}
function changeSelectedOption(id, value) {
	var e = document.getElementById(id);
	if (e)
		e.value = value;
}
function decodeString(text) {
	text = text.replace(/\[amp\]/g, '&');
	text = text.replace(/\[que\]/g, '?');
	text = text.replace(/\[lt\]/g, '<');
	text = text.replace(/\[gt\]/g, '>');
	text = text.replace(/\[pound\]/g, '#');
	text = text.replace(/&lt;/g, '<');
	text = text.replace(/&gt;/g, '>');
	return text;
}
function numberVal(val) {
	if (!val || val.length == 0)
		return 0;
	else
		return Number(val);
}
function getMonthYear(month, year) {
	return year + pad(month);
}

function numberWithSuffix(i) {
	var j = i % 10,
		k = i % 100;
	if (j == 1 && k != 11) {
		return i + "st";
	}
	if (j == 2 && k != 12) {
		return i + "nd";
	}
	if (j == 3 && k != 13) {
		return i + "rd";
	}
	return i + "th";
}
function getMonthObj(month, year) {
	if (month > 12) {
		month -= 12;
		year++;
	}
	if (month < 1) {
		month += 12;
		year--;
	}
	return { month: month, year: year };
}
function pad(n, width = 2, z) {
	width = width || 2;
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
function convertMoneyToNumber(currencyText) {
	var num = Number(currencyText.replace(/[^0-9\.-]+/g, ""));
	return num;
}
function getMonthStr(mon, year) {
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	return months[mon - 1] + ' ' + year;
}
function togglePopup(name, absoluteFlg = false, closeFlg = false) {
	var e = document.getElementById(name);
	if (e) {
		if (!closeFlg && e.style.display != 'block') {
			openPopup(name, absoluteFlg);
		} else
			e.style.display = 'none';
	} else
		alert('no name:' + name);
}
function openPopup(name, absoluteFlg = false) {
	var e = document.getElementById(name);
	if (e) {
		e.style.display = 'block';
		var w = window.innerWidth;
		var rect = e.getBoundingClientRect();
		var left = (w - rect.width) / 2;
		var top = window.pageYOffset;

		if (!absoluteFlg)
			top = 30;
		if (left < 0)
			left = 0;
		e.style.left = left.toString() + 'px';
		e.style.top = top.toString() + 'px';
		scrollToTop();
		if (absoluteFlg) {
			e.style.position = 'absolute';
			window.scrollTo(left, top);
		}
	}
}
function changeClass(segName, className) {
	var e = document.getElementById(segName);
	if (e) {
		e.className = className;
	} else
		alert('changeClass, not found: ' + segName);
}
function getMoneyValue(id) {
	var e = document.getElementById(id);
	if (e)
		return convertMoneyToNumber(e.value);
	else {
		return '';
	}

}
function getTextFieldValue(id) {
	var e = document.getElementById(id);
	if (e)
		return e.value;
	else {
		return '';
	}
}
function setTextValue(id, text, ignoreFlg) {
	var e = document.getElementById(id);
	if (e)
		e.value = text;
	else if (!ignoreFlg)
		alert(id + ' not found!');
}
function setTextHtml(id, text) {
	var e = document.getElementById(id);
	if (e)
		e.innerHTML = text;
	else
		alert(id + ' not found!');
}
function getTextHtml(id) {
	var e = document.getElementById(id);
	if (e)
		return e.innerHTML;
	else
		alert(id + ' not found!');
}
function getMoneyNumberForField(id) {
	var value = getTextFieldValue(id);
	return convertMoneyToNumber(value);
}
function disableButton(id, flag) {
	var e = document.getElementById(id);
	if (e) {
		e.disabled = flag;
	}
}
function scrollToTop() {
	window.scrollTo(0, 0);
}
