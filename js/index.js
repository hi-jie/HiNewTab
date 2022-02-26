var now;
var body = document.getElementsByTagName('body')[0];
var time = document.getElementsByClassName('time-time')[0].children;
var date = document.getElementsByClassName('time-date')[0].children;
var engine = document.getElementsByClassName('engine')[0];
var engineList = document.getElementsByClassName('engine-list')[0];
var engineView = document.getElementsByClassName('engine-view')[0];
var engineItems = document.getElementsByClassName('engine-option');
var searchIn = document.getElementsByClassName('in')[0];
var searchOk = document.getElementsByClassName('ok')[0];

var userAgent = navigator.userAgent;

var weekdays = [
	'星期日',
	'星期一',
	'星期二',
	'星期三',
	'星期四',
	'星期五',
	'星期六',
];

var engines = {
	'360': 'https://www.so.com/s?ie={inputEncoding}&q=%s',
	'baidu': 'https://www.baidu.com/#ie={inputEncoding}&wd=%s',
	'sougou': 'https://www.sogou.com/web?ie={inputEncoding}&query=%s',
	'bing': 'https://cn.bing.com/search?q=%s',
	'csdn': 'https://so.csdn.net/so/search?q=%s'
};

function timer () {
	now = new Date();

	let f = formatFullDate;
	
	time[0].innerText = f(now.getHours(), 2);
	time[1].innerText = ' : ' + f(now.getMinutes(), 2);
	time[2].innerText = ' : ' + f(now.getSeconds(), 2);
	
	date[0].innerText = f(now.getFullYear(), 4);
	date[1].innerText = f(now.getMonth() + 1, 2);
	date[2].innerText = f(now.getDate(), 2);	
	date[3].innerText = weekdays[now.getDay()];
}

function formatFullDate (str, length) {
	if (length < 0) {
		length = 0;
	};
	return (Array(length).join('0') + str).slice(-length);
}

function format (s, list, dict) {
	let i;
	for (i = 1; i < list.length; i++) {
		s = s.replace('%' + i, list[i]);
		s = s.replace('{' + i + '}', list[i]);
	};
	for (i in dict) {
		s = s.replace('%' + i, dict[i]);
		s = s.replace('{' + i + '}', dict[i]);
	};
	return s;
}

function search () {
	let keyword = searchIn.value;
	if (/\S/.test(keyword)) {
		if (/.+\...+/.test(keyword)) { // aaa.aa
			var url = keyword;
			if (! /http:\/\//.test(url)) {
				url = 'http://' + url;
			};
		} else {
			var url = engines[engineView.getAttribute('value')];
			url = format(url, [], {
				'inputEncoding': 'utf-8', 
				's': keyword
			});
		};
		window.open(url);
	};
}

// 判断手机
if (/(iPhone\sOS)\s([\d_]+)/.test(userAgent) || /(Android)\s+([\d.]+)/.test(userAgent)) {
	alert('is 手机');
};

// 禁止选取页面内容
body.onselectstart = function () {
	return false;
};

// 切换搜索引擎
engine.onmouseleave = function () {
	engineList.style.display = 'none';
	engineView.style.backgroundColor = '';
};
engineView.onclick = function () {
	engineList.style.display = 'block';
	engineView.style.backgroundColor = '#cfcfcf';
};
for (item of engineItems) {
	item.onclick = function () {
		engineView.replaceChild(this.children[0].cloneNode(), engineView.children[0]);
		engineView.setAttribute('value', this.getAttribute('value'));
		engineList.style.display = 'none';
		searchIn.placeholder = this.innerText + '搜索';
	};
};

// 按下回车键或点击搜索按钮搜索
searchIn.onkeypress = function () {
	if (event.keyCode == 13) {
		search();
	};
};
searchOk.onclick = search;

// 搜索框获得焦点
searchIn.focus()

setInterval(timer, 100);