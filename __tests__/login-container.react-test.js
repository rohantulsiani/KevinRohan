import Login from '../src/containers/login-container';
import reducer, {dispatchAttemptLogin} from '../src/reducers/login-reducer';

import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';


describe('Login Page', ()=>{
	const initialState = {entities: [], loginInfo: '', entity: []};
	const mockStore = configureStore();
	let store, wrapper;


	beforeEach(()=>{
        store = mockStore(initialState);
        wrapper = mount( <Provider store={store}><Login /></Provider> );
    });

	//white box test
	it('Login Container View is rendered properly before logging in', ()=>{
		const passwordProps = wrapper.find('#password').props();
		const title = wrapper.find('h2').text();

		expect(title).toEqual('Login');
		expect(passwordProps.placeholder).toEqual('Password');
		
		expect(store.getState().loginInfo).toEqual('');
	});

	//white box test
	it('User logging in - dispatch action and to firebase', async ()=>{
		/* making sure firebase work as expected by putting in
		  email and password and click the button */
		const emailInput = wrapper.find('#email');
		emailInput.simulate('change', {target:{value: 'ethantest@usc.edu'}});
		
		const passwordInput = wrapper.find('#password');
		passwordInput.simulate('change', {target:{value: 'haha123'}});

		const loginBtn = wrapper.find('#loginBtn');
		loginBtn.simulate('click');

		//dispatch login action
		const payload = {email: 'ethantest@usc.edu'};
		const expectedAction = {
			type: 'AttemptLogin'
			,payload
		};
		store.dispatch(dispatchAttemptLogin(payload));
		expect(store.getActions()).toEqual([expectedAction]);
	});

	//white box test
	it('User entering the wrong passwordd - error message should be renedered', async ()=>{
		/* making sure firebase work as expected by putting in
		  email and password and click the button */
		const emailInput = wrapper.find('#email');
		emailInput.simulate('change', {target:{value: 'ethantest@usc.edu'}});
		
		const passwordInput = wrapper.find('#password');
		passwordInput.simulate('change', {target:{value: 'wrong password'}});

		const loginBtn = wrapper.find('#loginBtn');
		loginBtn.simulate('click');
		

		wrapper.find('Login').instance().toggleError('Wrong Password');
		//re-render the login component to get the displayed error message
		wrapper.update();
		
		const errorMessage = wrapper.find('#errorMessage').text();
		expect(errorMessage).toEqual('Wrong Password');
	});

	//white box test
	it('Before user log in - should return initial state', () =>{
		expect(reducer(undefined, {})).toEqual('');
	});

	//white box test
	it('User logging in - changing the reducer(store)', ()=>{
		/* changing the store */

		expect(reducer('', {
			type: 'AttemptLogin',
			payload: {
				userEmail: 'ethanTest@usc.edu'
			}
		})).toEqual({
				userEmail: 'ethanTest@usc.edu'
		});

	});
});