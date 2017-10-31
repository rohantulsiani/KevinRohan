'use strict';

var selenium = require('selenium-webdriver');
var driver = new selenium.Builder().withCapabilities(selenium.Capabilities.chrome()).build();
const {By, Key, until} = require('selenium-webdriver');

describe('Render Search Page', function() {

    beforeEach(function(done) {
       	driver.get('localhost:8080/search/').then(done);
        driver.sleep(1000);
    });

    afterEach(function(done) {
        driver.quit();
        done();
    });

    it('Should render search page', function(done) {
        var element = driver.findElement(By.id('searchButton'));

        driver.getCurrentUrl().then(value => {
	        expect(value).toContain('/search/');
	        done();
    	});

    });

  });