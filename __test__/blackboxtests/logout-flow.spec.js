'use strict';

var webdriver = require('selenium-webdriver');
var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome'}).build();
const {By, Key, until} = require('selenium-webdriver');

// test multiple logout flows

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
	console.log('Should have logged in');
	console.log('Should be redirected to the main page (localhost:8080)');

	browser.sleep(3000);
	browser.switchTo().defaultContent();
	var logoutButton = browser.findElement(By.id("logoutButton"));
	logoutButton.click();
	browser.sleep(3000);

// logout while currently in the profile
	browser.switchTo().defaultContent();
	var loginButton = browser.findElement(By.id('loginButton'));
	loginButton.click();
	browser.sleep(1500);

	var emailForm = browser.findElement(By.className('col-sm-5 form-control')); // otherwise throws stale error
	var passwordForm = browser.findElement(By.name('passwordInputBox'));
	emailForm.sendKeys('cristiano@usc.edu');
	browser.sleep(1500);
	passwordForm.sendKeys('cristiano123');
	browser.sleep(1500);
	var loginButton = browser.findElement(By.name('loginButton'));
	loginButton.click();

	
	browser.sleep(3000);
	browser.switchTo().defaultContent();
	var profileButton = browser.findElement(By.name("profileButtonInNavbar"));
	browser.sleep(2000);
	profileButton.click();

	browser.sleep(2000);
	browser.switchTo().defaultContent();
	var commentsButton = browser.findElement(By.id("comment"));
	commentsButton.click();
	browser.sleep(2000);

	var postsButton = browser.findElement(By.id("post"));
	postsButton.click();
	browser.sleep(2000);

	var logoutButton = browser.findElement(By.id("logoutButton"));
	logoutButton.click();
	browser.sleep(2000);


	// logout while currently viewing a post
	browser.switchTo().defaultContent();
	var loginButton = browser.findElement(By.id('loginButton'));
	loginButton.click();
	browser.sleep(1500);

	var emailForm = browser.findElement(By.className('col-sm-5 form-control')); // otherwise throws stale error
	var passwordForm = browser.findElement(By.name('passwordInputBox'));
	emailForm.sendKeys('cristiano@usc.edu');
	browser.sleep(1500);
	passwordForm.sendKeys('cristiano123');
	browser.sleep(1500);
	var loginButton = browser.findElement(By.name('loginButton'));
	loginButton.click();
	browser.sleep(2000);

	browser.switchTo().defaultContent();
	var viewPostButton = browser.findElement(By.id("viewPostButton"));
	viewPostButton.click();
	browser.sleep(2000);

	var logoutButton = browser.findElement(By.id("logoutButton"));
	logoutButton.click();
	browser.sleep(2000);

	browser.switchTo().defaultContent();
	var loginButton = browser.findElement(By.id('loginButton'));
	loginButton.click();
	browser.sleep(1500);

	var emailForm = browser.findElement(By.className('col-sm-5 form-control')); // otherwise throws stale error
	var passwordForm = browser.findElement(By.name('passwordInputBox'));
	emailForm.sendKeys('cristiano@usc.edu');
	browser.sleep(1500);
	passwordForm.sendKeys('cristiano123');
	browser.sleep(1500);
	var loginButton = browser.findElement(By.name('loginButton'));
	loginButton.click();
	browser.sleep(2000);

	browser.quit()

});




// BUG: after you logout from your profile page, should be redirected to main page
// Instead, only view post and comments button on the same profile page layout
