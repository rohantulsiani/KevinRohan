'use strict';

var webdriver = require('selenium-webdriver');
var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome'}).build();
const {By, Key, until} = require('selenium-webdriver');


browser.get('localhost:8080/login').then(() => {
	browser.sleep(1500);

	var emailForm = browser.findElement(By.className('col-sm-5 form-control'));
	var passwordForm = browser.findElement(By.name('passwordInputBox'));
	
	emailForm.sendKeys('cristiano@usc.edu');
	browser.sleep(1500);
	passwordForm.sendKeys('cristiano123');
	browser.sleep(1500);
	

	var loginButton = browser.findElement(By.name('loginButton'));
	loginButton.click();
	console.log('Should be redirected to the main page (localhost:8080)');


	// go to profile
	browser.sleep(3000);
	browser.switchTo().defaultContent();
	var profileButton = browser.findElement(By.name("profileButtonInNavbar"));
	browser.sleep(3000);
	profileButton.click();

	browser.sleep(3000);
	browser.switchTo().defaultContent();
	var commentsButton = browser.findElement(By.id("comment"));
	commentsButton.click();
	browser.sleep(3000);

	var postsButton = browser.findElement(By.id("post"));
	postsButton.click();
	browser.sleep(3000);

	//browser.sleep(3000);
	browser.quit()

});











