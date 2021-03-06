
const clickLoginButton = () => {

	var webdriver = require('selenium-webdriver');
	var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome'}).build();
	const {By, Key, until} = require('selenium-webdriver');

	browser.get('localhost:8080/login').then(() => {
		var element = browser.findElement(By.id("loginBtn"));
		element.click();
		console.log('Invalid message should display');
		browser.sleep(3000);
		browser.quit();
	});

	// this test has a bug - when there is no input, nothing happens to the page when you click login
	// Should be a display such as "invalid input" 
}

module.exports = {
	clickLoginButton: clickLoginButton
}

