'use strict';

var selenium = require('selenium-webdriver');
var driver = new selenium.Builder().withCapabilities(selenium.Capabilities.chrome()).build();
const {By, Key, until} = require('selenium-webdriver');

describe('Render Profile Page', function() {

    beforeEach(function(done) {
        	driver.get('localhost:8080/profile');
			done();
    });

    afterEach(function(done) {
        driver.quit();
        done();
    });

    it('Should render profile page', function(done) {
        var element = driver.findElement(selenium.By.id('displayUserName'));

        driver.getCurrentUrl().then(value => {
	        expect(value).toContain('/profile');
	        done();
    	});

    });

  });



// && jest react-test.js FOR NPM TEST