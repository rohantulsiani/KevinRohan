'use strict';

var webdriver = require('selenium-webdriver');
var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome'}).build();
const {By, Key, until} = require('selenium-webdriver');

// test multiple logout flows

browser.get('localhost:8080/login').then(() => {

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

	browser.switchTo().defaultContent();
	var star = browser.findElement(By.id("star-4"));
	star.click();
	star.submit();
	browser.sleep(2000);

	browser.switchTo().defaultContent();
	var submitReview = browser.findElement(By.id("submitReviewButton"));
	submitReview.click();
	submitReview.submit();
	browser.sleep(2000);

	browser.quit()

});
