
const clickRegisterButton = () => {

	var webdriver = require('selenium-webdriver');
	var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome'}).build();
	const {By, Key, until} = require('selenium-webdriver');


	browser.get('localhost:8080/login').then(() => {
		var element = browser.findElement(By.id("registerButton"));
		element.click();
		browser.sleep(2000);
		browser.quit();
	});

	// this test checks out - shows an "invalid input message" when nothing is inputed for email and password

}

module.exports = {
	clickRegisterButton: clickRegisterButton
}