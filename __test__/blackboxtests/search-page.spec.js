'use strict';

var selenium = require('selenium-webdriver');
var driver = new selenium.Builder().withCapabilities(selenium.Capabilities.chrome()).build();
const {By, Key, until} = require('selenium-webdriver');

describe('Render Search Page', function() {

    // Open the TECH.insight website in the browser before each test is run
    beforeEach(function(done) {
       	driver.get('localhost:8080/search/').then(done);
        driver.sleep(1000);
    });

    // Close the website after each test is run (so that it is opened fresh each time)
    afterEach(function(done) {
    	//driver.sleep(3000);
        //driver.quit(); 
        done();
    });

    // Test to ensure we are on the home page by checking the <body> tag id attribute
    it('Should render search page', function(done) {
        var element = driver.findElement(By.name('searchButton'));

        driver.getCurrentUrl().then(value => {
	        console.log("value:" , value);
	        //expect(value).toContain('/search/');
	        done();
    	});

    });

  });