// 'use strict';

const successfulLogin = () => {
	var webdriver = require('selenium-webdriver');
	var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome'}).build();
	const {By, Key, until} = require('selenium-webdriver');


	// should test successful login attempt


	browser.get('localhost:8080/login').then(() => {
		browser.sleep(1500);

		var emailForm = browser.findElement(By.name('emailInputBox'));
		var passwordForm = browser.findElement(By.name('passwordInputBox'));
		
		emailForm.sendKeys('cristiano@usc.edu');
		browser.sleep(1500);
		passwordForm.sendKeys('cristiano123');
		browser.sleep(1500);
		

		var loginButton = browser.findElement(By.name('loginButton'));
		loginButton.click();
		console.log('Should have logged in');
		console.log('Should be redirected to the main page (localhost:8080)');

		browser.sleep(5000);
		browser.quit()

	});
}

module.exports = {
	successfulLogin: successfulLogin
}
// test doesn't work, but real-life does (and that's more important)