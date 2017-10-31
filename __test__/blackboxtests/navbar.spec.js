//'use strict';

const navbarTest = () => {
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

		var element = browser.findElement(By.id("searchButton"));
		element.click();
		console.log('http://localhost:8080/search/ should be rendered');	
		browser.sleep(3000);
		

		var element = browser.findElement(By.id("knowItAllButton"));
		element.click();
		console.log('http://localhost:8080 (main page) should be rendered');	
		browser.sleep(3000);


		browser.quit();
	});
}

module.exports = {
	navbarTest: navbarTest
}

// checks out 