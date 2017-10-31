'use strict';

var webdriver = require('selenium-webdriver');
var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome'}).build();
const {By, Key, until} = require('selenium-webdriver');


// should test invalid login attempt


browser.get('localhost:8080/login').then(() => {
	browser.sleep(1500);

	var loginButton = browser.findElement(By.name('loginButton'));
	loginButton.click();
	console.log('Should have NOT logged in');

	browser.sleep(1500);

	var emailForm = browser.findElement(By.className('col-sm-5 form-control'));
	var passwordForm = browser.findElement(By.name('passwordInputBox'));
	
	emailForm.sendKeys('flavio@fake.edu');
	browser.sleep(1500);
	passwordForm.sendKeys('flavio123');
	browser.sleep(1500);
	
	loginButton.click();
	console.log('Should have NOT logged in');

	browser.sleep(3000);
	browser.quit()

});


// BUG FOUND: When you click on login button with invalid inputs, no error message shows
