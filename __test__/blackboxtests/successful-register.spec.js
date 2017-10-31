
const successfulRegister = () => {

	var webdriver = require('selenium-webdriver');
	var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome'}).build();
	const {By, Key, until} = require('selenium-webdriver');


	// should test invalid register attempt


	browser.get('localhost:8080/login').then(() => {
		browser.sleep(1500);

		var emailForm = browser.findElement(By.className('col-sm-5 form-control'));
		var passwordForm = browser.findElement(By.name('passwordInputBox'));
		
		emailForm.sendKeys('cristiano@usc.edu');
		browser.sleep(1500);
		passwordForm.sendKeys('cristiano123');
		browser.sleep(1500);
		

		var registerButton = browser.findElement(By.id("registerButton"));
		registerButton.click();
		console.log('Should have registered SUCCESSFULLY');
		console.log('Should go to main page (localhost:8080)')

		browser.sleep(3000);
		browser.quit()

	});

	// replace with a new (valid) email and password, and it should be successful : ) 
	// to get successful login, replace 'flavio@usc.edu' and 'flavio123'

}

module.exports = {
	successfulRegister: successfulRegister
}



