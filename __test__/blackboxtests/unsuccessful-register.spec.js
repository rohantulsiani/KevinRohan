'use strict';

var webdriver = require('selenium-webdriver');
var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome'}).build();
const {By, Key, until} = require('selenium-webdriver');


// should test invalid register attempt


browser.get('localhost:8080/login').then(() => {
	browser.sleep(1500);

	var emailForm = browser.findElement(By.className('col-sm-5 form-control'));
	var passwordForm = browser.findElement(By.name('passwordInputBox'));
	
	emailForm.sendKeys('flavio@fake.edu');
	browser.sleep(1500);
	passwordForm.sendKeys('flavio123');
	browser.sleep(1500);
	

	var registerButton = browser.findElement(By.id("registerButton"));
	registerButton.click();
	console.log('Should have NOT registered');

	browser.sleep(2000);
	emailForm.clear();
	passwordForm.clear();
	browser.sleep(1500);

	// test with already registered user

	emailForm = browser.findElement(By.className('col-sm-5 form-control'));
	passwordForm = browser.findElement(By.name('passwordInputBox'));
	
	emailForm.sendKeys('flavio@usc.edu');
	browser.sleep(1500);
	passwordForm.sendKeys('flavio123');
	browser.sleep(1500);
	

	var registerButton = browser.findElement(By.id("registerButton"));
	registerButton.click();
	console.log('Should have registered UNSUCCESSFULLY');
	console.log('Should go to main page (localhost:8080)')

	browser.sleep(3000);

	browser.quit()

});


// BUG FOUND: When you click on register button , the invalid message disappears when you click on register twice, 
// even if the input is invalid
