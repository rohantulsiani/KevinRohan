// browser.get('localhost:8080/login').then(() => {
// 	browser.sleep(3000);
// 	browser.manage().window().maximize();
// 	browser.sleep(3000);
// 	console.log('Max size browser window size');

// 	browser.sleep(3000);
// 	browser.manage().window().setSize(1280, 720);
// 	browser.sleep(3000);
// 	console.log('Custom browser window size');

// 	browser.sleep(3000);
// 	browser.manage().window().setSize(500, 500);
// 	browser.sleep(3000);
// 	console.log('Custom browser window size');

// 	browser.sleep(3000);
// 	browser.manage().window().setSize(400, 900);
// 	browser.sleep(3000);
// 	console.log('Custom browser window size');
// 	closeBrowser();

// });


'use strict';

describe('Testing the Responsiveness of the website', () => {



	var selenium = require('selenium-webdriver');
	var driver = new selenium.Builder().withCapabilities(selenium.Capabilities.chrome()).build();
	const {By, Key, until} = require('selenium-webdriver');

	describe('Test max size of website', function() {

	    // Open the TECH.insight website in the browser before each test is run
	    beforeEach(function(done) {
	       	driver.get('localhost:8080/login').then(done);
	        driver.sleep(1000);
	    });

	    // Close the website after each test is run (so that it is opened fresh each time)
	    afterEach(function(done) {
	    	// driver.sleep(3000);
	     //    driver.quit(); 
	        done();
	    });

	    // Test to ensure we are on the home page by checking the <body> tag id attribute
	    it('Should resize page to max size', function(done) {

	    	driver.sleep(3000);
			driver.manage().window().maximize();
			expect(driver.manage().window().getSize()).toBe()
			driver.sleep(3000);
			console.log('Max size browser window size');

			done();
	        // var element = driver.findElement(By.id('loginPage'));

	        // element.getAttribute('id').then(function(id) {
	        //     expect(id).toBe('loginPage');
	        //     driver.sleep(3000);
	        //     done();
	        // });
	        
	    });

	});


	describe('Custom website size', () => {

		beforeEach(done => {
			driver.get('localhost:8080/login').then(done);
	        driver.sleep(1000);
	        // done();
		})


		afterEach(done => {
	    	// driver.sleep(3000);
	     //    driver.quit(); 
	        done();
	    });

	     it('Should resize page to max size', done => {

	    	driver.sleep(3000);
			expect(driver.manage().window().setSize(1280, 720)).toHaveBeenCalled();
			driver.sleep(3000);
			done();
			console.log('Max size browser window size');


	        // var element = driver.findElement(By.id('loginPage'));

	        // element.getAttribute('id').then(function(id) {
	        //     expect(id).toBe('loginPage');
	        //     driver.sleep(3000);
	        //     done();
	        // });
	        
	    });
	})



})




