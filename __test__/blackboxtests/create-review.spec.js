
const createReview = () => {

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
		browser.sleep(1500);

		var addEntityButton = browser.findElement(By.id('addEntityButton'));
		addEntityButton .click();
		browser.sleep(1500);

		browser.switchTo().defaultContent();
		var subjectInput = browser.findElement(By.id("subject"));
		subjectInput.sendKeys('How great is swimming with sharks?');
		browser.sleep(1500);

		browser.switchTo().defaultContent();
		var entityType = browser.findElement(By.id("entityType"));
		entityType.sendKeys('Review');
		browser.sleep(1500);

		browser.switchTo().defaultContent();
		var categoryType = browser.findElement(By.name("categorySelect"));
		categoryType.sendKeys('Random');
		browser.sleep(1500);


		var postButton = browser.findElement(By.id("submitBtn"));
		postButton.click();
		console.log('Should be redirected to the main page (localhost:8080)');
		browser.sleep(1500);

		//scroll all the way down to see new post
		browser.executeScript("window.scrollTo(0, document.body.scrollHeight)");
		browser.sleep(2000);

		browser.quit()


	});

}

module.exports = {
	createReview: createReview
}
