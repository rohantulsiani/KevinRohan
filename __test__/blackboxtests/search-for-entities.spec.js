'use strict';

var webdriver = require('selenium-webdriver');
var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome'}).build();
const {By, Key, until} = require('selenium-webdriver');


// test flow from main page (localhost:8080) to login, to search and back to main page


browser.get('localhost:8080').then(() => {
	browser.sleep(3000);
	
	var element = browser.findElement(By.id("loginButton"));
	element.click();
	console.log('Login page rendered');
	browser.sleep(3000);

	var emailForm = browser.findElement(By.className('col-sm-5 form-control'));
	var passwordForm = browser.findElement(By.name('passwordInputBox'));
	
	emailForm.sendKeys('cristiano@usc.edu');
	browser.sleep(1500);
	passwordForm.sendKeys('cristiano123');
	browser.sleep(1500);
	

	var loginButton = browser.findElement(By.name('loginButton'));
	loginButton.click();
	console.log('Should be redirected to the main page (localhost:8080)');
	browser.sleep(1500);

	var searchInput = browser.findElement(By.id('searchInput'));
	searchInput.sendKeys('USC');
	browser.sleep(1500);

	var searchButton = browser.findElement(By.id("searchButton"));
	searchButton.click();	
	browser.sleep(3000);
	

	browser.quit();
});