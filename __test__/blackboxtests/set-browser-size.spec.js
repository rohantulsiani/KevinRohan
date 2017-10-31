
const setBrowserSize = () => {
	var webdriver = require('selenium-webdriver');
	var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome'}).build();
	const {By, Key, until} = require('selenium-webdriver');


	browser.get('localhost:8080/login').then(() => {
		browser.sleep(3000);
		browser.manage().window().maximize();
		browser.sleep(3000);
		console.log('Max size browser window size');

		browser.sleep(3000);
		browser.manage().window().setSize(1280, 720);
		browser.sleep(3000);
		console.log('Custom browser window size');

		browser.sleep(3000);
		browser.manage().window().setSize(500, 500);
		browser.sleep(3000);
		console.log('Custom browser window size');

		browser.sleep(3000);
		browser.manage().window().setSize(400, 900);
		browser.sleep(3000);
		console.log('Custom browser window size');

		browser.quit();

	});

}

module.exports = {
	setBrowserSize: setBrowserSize
}





