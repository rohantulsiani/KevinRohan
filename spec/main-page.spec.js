'use strict';

var selenium = require('selenium-webdriver');
var driver = new selenium.Builder().withCapabilities(selenium.Capabilities.chrome()).build();
const {By, Key, until} = require('selenium-webdriver');

describe('Render Main Page', function() {

    beforeEach(function(done) {
       	driver.get('localhost:8080/').then(done);
        driver.sleep(1000);
    });

    // Close the website after each test is run (so that it is opened fresh each time)
    afterEach(function(done) {
        driver.quit(); 
        done();
    });

    // Test to ensure we are on the home page by checking the <body> tag id attribute
    it('Should be on the login page', function(done) {
        var element = driver.findElement(By.id('mainPage'));

        driver.getCurrentUrl().then(value => {
	        expect(value).toContain('/');
	        done();
    	});
    });

  });