
import Entity from '../src/containers/entity-container';

import reducer, {dispatchGetEntity} from '../src/reducers/entity-reducer';
import React from 'react';
import {shallow} from 'enzyme';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';



describe('Create an Entity', ()=>{

	const initialState = {entities: [], loginInfo: '', entity: []};
	const mockStore = configureStore();
	let store, wrapper;


	beforeEach(()=>{
        store = mockStore(initialState);
        wrapper = shallow( <Provider store={store}><Entity /></Provider> );
    });

	//white box test
	it('Create an entity - dispatch action to firebase', ()=>{
		const payload = {
			entityType: 'Poll',
			options: ['test1', 'test2'],
			owner: 'ethantest@usc.edu', 
			subject: 'about to get deleted', 
			timeLimit: 'test', 
			anonymous: false, 
			category: 'test', 
			detail: 'nothing'
		};
		const expectedAction = {
			type: 'GetEntityFromFirebase'
			,payload
		};

		store.dispatch(dispatchGetEntity(payload));
		expect(store.getActions()).toEqual([expectedAction]);
	});

	//white box test
	it('Before creating an entity, the entity reduer should return initial state', ()=>{
		expect(reducer(undefined, {})).toEqual([]);
	});

	//white box test
	it('Creating an entity -> changing the entity reducer', ()=>{
		expect(reducer('',{
			type: 'GetEntityFromFirebase',
			payload:{
				entityType: 'Poll',
				options: ['test1', 'test2'],
				owner: 'ethantest@usc.edu', 
				subject: 'about to get deleted', 
				timeLimit: 'test', 
				anonymous: false, 
				category: 'test', 
				detail: 'nothing'
			}
		})).toEqual({
			entityType: 'Poll',
			options: ['test1', 'test2'],
			owner: 'ethantest@usc.edu', 
			subject: 'about to get deleted', 
			timeLimit: 'test', 
			anonymous: false, 
			category: 'test', 
			detail: 'nothing'
		});
	});


});