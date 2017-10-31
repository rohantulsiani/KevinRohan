'use strict';

var webdriver = require('selenium-webdriver');
var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome'}).build();
const {By, Key, until} = require('selenium-webdriver');


// test should show an error when there is no input but the register button is clicked

browser.get('localhost:8080/login').then(() => {
	var element = browser.findElement(By.id("registerButton"));
	element.click();
	
	//browser.quit();
});

// this test checks out - shows an "invalid input message" when nothing is inputed for email and password