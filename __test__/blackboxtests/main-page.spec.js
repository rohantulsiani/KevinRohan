'use strict';

var webdriver = require('selenium-webdriver');
var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome'}).build();

browser.get('localhost:8080').then(() => {
	console.log('Main page rendered');
});