'use strict';

var selenium = require('selenium-webdriver');
var driver = new selenium.Builder().withCapabilities(selenium.Capabilities.chrome()).build();
const {By, Key, until} = require('selenium-webdriver');

describe('Search User Action', function() {

    beforeEach(function(done) {
       	driver.get('localhost:8080/');
       	// var driver = new selenium.Builder().withCapabilities(selenium.Capabilities.chrome()).build();
       	done();
        // driver.sleep(1000);
    });

    // Close the website after each test is run (so that it is opened fresh each time)
    afterEach(function(done) {
        driver.quit(); 
        done();
    });

    // Test to ensure we are on the home page by checking the <body> tag id attribute
    it('Should redirect to page with "hello" entities', function(done) {
        var searchInput = driver.findElement(selenium.By.id('searchInput'));
        searchInput.sendKeys("Hello");
        
        var searchButton = driver.findElement(selenium.By.linkText('Search'));
        searchButton.click();

        driver.getCurrentUrl().then(value => {
	        expect(value).toContain('/search/Hello');
	        done();
    	});
    });

  });

