// 'use strict';

// var selenium = require('selenium-webdriver');
// var driver = new selenium.Builder().withCapabilities(selenium.Capabilities.chrome()).build();
// const {By, Key, until} = require('selenium-webdriver');

// describe('Create Post User Action', function() {

//     beforeEach(function(done) {
//        	driver.get('localhost:8080/login');
//        	done();
//     });

//     // Close the website after each test is run (so that it is opened fresh each time)
//     afterEach(function(done) {
//         driver.quit(); 
//         done();
//     });

//     // Test to ensure we are on the home page by checking the <body> tag id attribute
//     it('Should create post', function(done) {
//         var emailForm = driver.findElement(selenium.By.id('email'));
//         emailForm.sendKeys("flavio@usc.edu");

//         var passwordForm = driver.findElement(selenium.By.id('password'));
//         passwordForm.sendKeys("flavio123");

//         var loginButton = driver.findElement(selenium.By.linkText('Login'));

//         loginButton.click();

//         driver.switchTo().defaultContent();
//         var addEntityButton = driver.findElement(selenium.By.linkText('Add Entity'));
// 		addEntityButton.click();
		

// 		// driver.switchTo().defaultContent();
// 		// var subjectInput = driver.findElement(selenium.By.id("subject"));
// 		// subjectInput.sendKeys('Who is the best basketball player?');
		

// 		// driver.switchTo().defaultContent();
// 		// var entityType = driver.findElement(selenium.By.id("entityType"));
// 		// entityType.sendKeys('Poll');
		

// 		// driver.switchTo().defaultContent();
// 		// var categoryType = driver.findElement(selenium.By.name("categorySelect"));
// 		// categoryType.sendKeys('Random');
		

// 		// driver.switchTo().defaultContent();
// 		// var addPollOption = driver.findElement(selenium.By.id("addPollOption"));
// 		// addPollOption.sendKeys('Lebron James?');
// 		// addPollOption.sendKeys(selenium.Key.ENTER); // if doesn't work, try webdriver.Key.ENTER
		

// 		// driver.switchTo().defaultContent();
// 		// var addPollOption = driver.findElement(selenium.By.id("addPollOption"));
// 		// addPollOption.sendKeys('Dwayne Wade?');
// 		// addPollOption.sendKeys(selenium.Key.ENTER);
		

// 		// driver.switchTo().defaultContent();
// 		// var addPollOption = driver.findElement(selenium.By.id("addPollOption"));
// 		// addPollOption.sendKeys('Kevin Durant?');
// 		// addPollOption.sendKeys(selenium.Key.ENTER);
		

// 		// driver.switchTo().defaultContent();
// 		// var addPollOption = driver.findElement(selenium.By.id("addPollOption"));
// 		// addPollOption.sendKeys('Steph Curry?');
// 		// addPollOption.sendKeys(selenium.Key.ENTER);
		

// 		// var postButton = driver.findElement(selenium.By.linkText("Post"));
// 		// postButton.click();

// 		// //scroll all the way down to see new post
// 		// driver.executeScript("window.scrollTo(0, document.body.scrollHeight)");


//      //    driver.getCurrentUrl().then(value => {
// 	    //     expect(value).toContain('/');
// 	    //     done();
//     	// });
//     });

//   });
