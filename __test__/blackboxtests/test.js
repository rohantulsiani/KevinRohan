var successfulLogin = require('./successful-login.spec.js');
var navbarTest = require('./navbar.spec.js');
var setBrowserSize = require('./set-browser-size.spec.js');
var clickLoginButton = require('./click-login-button.spec.js');
var clickRegisterButton = require('./click-register-button.spec.js');
var createPoll = require('./create-poll.spec.js');
var createReview = require('./create-review.spec.js');
var loginToProfileFlow = require('./login-to-profile-flow.spec.js');
var searchForEntities = require('./search-for-entities.spec.js');
var submitDownVote = require('./submit-downvote.spec.js');
var submitUpVote = require('./submit-upvote.spec.js');
var successfulRegister = require('./successful-register.spec.js');
var unsuccessfulLogin = require('./unsuccessful-login.spec.js');
var unsuccessfulRegister = require('./unsuccessful-register.spec.js');

successfulLogin.successfulLogin();
navbarTest.navbarTest();
setBrowserSize.setBrowserSize();
clickLoginButton.clickLoginButton();
clickRegisterButton.clickRegisterButton();
createPoll.createPoll();
createReview.createReview();
loginToProfileFlow.loginToProfileFlow();
searchForEntities.searchForEntities();
submitDownVote.submitDownVote();
submitUpVote.submitUpVote();
successfulRegister.successfulRegister();
unsuccessfulLogin.unsuccessfulLogin();
unsuccessfulRegister.unsuccessfulRegister();



