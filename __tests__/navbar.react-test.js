import Navbar from '../src/components/navbar';

import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter, Link } from 'react-router-dom';


describe('Login Page', ()=>{
	const mockStore = configureStore();
	let store, wrapper;

	//black box test
	it(`Navbar is rendered properly if the user it not logged in
		- only renders login button and not others`, ()=>{
		const initialState = {entities: [], loginInfo: null, entity: []};

		store = mockStore(initialState);
        wrapper = mount( <BrowserRouter><Provider store={store}><Navbar /></Provider></BrowserRouter> );

		wrapper.update();

		expect(wrapper.contains(
			<Link  id = "login" className="nav-link login" to="/login">Login</Link>))
		.toEqual(true);

		expect(wrapper.contains(
			<Link id = "profile" className="nav-link" to="/profile">Profile</Link>))
		.toEqual(false);

		expect(wrapper.contains(
			<Link className="nav-link" to="/admin">Admin</Link>))
		.toEqual(false);

	});

	//black box test
	it(`Navbar is rendered properly if the user is logged in
		- show other buttons but not admin button`, ()=>{
		const initialState = {entities: [], loginInfo: {
					uid: 'asdfass',
					displayName: 'ethan',
					photoURL: 'na',
					email: 'ethantest@usc.edu',
					emailVerified: false,
					isAdmin: false
			}, entity: []};

		store = mockStore(initialState);
        wrapper = mount( <BrowserRouter><Provider store={store}><Navbar /></Provider></BrowserRouter> );

        wrapper.update();
		
		expect(wrapper.contains(
			<Link  id = "login" className="nav-link login" to="/login">Login</Link>))
		.toEqual(false);

		expect(wrapper.contains(
			<Link id = "profile" className="nav-link" to="/profile">Profile</Link>))
		.toEqual(true);

		expect(wrapper.contains(
			<Link className="nav-link" to="/admin">Admin</Link>))
		.toEqual(false);
	});

	//black box test
	it(`Navbar is rendered properly if the Admin is logged in
		- show all buttons`, ()=>{
		const initialState = {entities: [], loginInfo: {
					uid: 'asdfass',
					displayName: 'ethan',
					photoURL: 'na',
					email: 'ethantest@usc.edu',
					emailVerified: false,
					isAdmin: true
			}, entity: []};

		store = mockStore(initialState);
        wrapper = mount( <BrowserRouter><Provider store={store}><Navbar /></Provider></BrowserRouter> );

        wrapper.update();
		
		expect(wrapper.contains(
			<Link  id = "login" className="nav-link login" to="/login">Login</Link>))
		.toEqual(false);

		expect(wrapper.contains(
			<Link id = "profile" className="nav-link" to="/profile">Profile</Link>))
		.toEqual(true);

		expect(wrapper.contains(
			<Link className="nav-link" to="/admin">Admin</Link>))
		.toEqual(true);
	});

});