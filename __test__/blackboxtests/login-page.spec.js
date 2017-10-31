'use strict';

var selenium = require('selenium-webdriver');
var driver = new selenium.Builder().withCapabilities(selenium.Capabilities.chrome()).build();
const {By, Key, until} = require('selenium-webdriver');

describe('Render Login Page', function() {

    // Open the TECH.insight website in the browser before each test is run
    beforeEach(function(done) {
       	driver.get('localhost:8080/login').then(done);
        driver.sleep(1000);
    });

    // Close the website after each test is run (so that it is opened fresh each time)
    afterEach(function(done) {
    	//driver.sleep(3000);
        //driver.quit(); 
        done();
    });

    // Test to ensure we are on the home page by checking the <body> tag id attribute
    it('Should be on the login page', function(done) {
        var element = driver.findElement(By.id('loginPage'));

        element.getAttribute('id').then(function(id) {
            expect(id).toBe('loginPage');
            driver.sleep(3000);
            done();
        })
    });

  });
