// 'use strict';

// var selenium = require('selenium-webdriver');
// var driver = new selenium.Builder().withCapabilities(selenium.Capabilities.chrome()).build();
// const {By, Key, until} = require('selenium-webdriver');

// describe('Login User Action', function() {

//     beforeEach(function(done) {
//        	driver.get('localhost:8080/login');
//        	// var driver = new selenium.Builder().withCapabilities(selenium.Capabilities.chrome()).build();
//        	done();
//         // driver.sleep(1000);
//     });

//     // Close the website after each test is run (so that it is opened fresh each time)
//     afterEach(function(done) {
//         driver.quit(); 
//         done();
//     });

//     // Test to ensure we are on the home page by checking the <body> tag id attribute
//     it('Should redirect to Main page after logging in', function(done) {
//         var emailForm = driver.findElement(selenium.By.id('email'));
//         emailForm.sendKeys("flavio@usc.edu");

//         var passwordForm = driver.findElement(selenium.By.id('password'));
//         passwordForm.sendKeys("flavio123");

//         var loginButton = driver.findElement(selenium.By.linkText('Login'));

//         loginButton.click();

//         var profileButton = driver.findElement(selenium.By.linkText('Profile'));

//         profileButton.click();


//         driver.getCurrentUrl().then(value => {
// 	        expect(value).toContain('/profile');
// 	        done();
//     	});
//     });

//   });
