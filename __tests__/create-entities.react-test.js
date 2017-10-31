import EntityModal from '../src/components/create-entity-modal';
import reducer, {dispatchGetEntities} from '../src/reducers/entities-reducer';

import React from 'react';
import {shallow} from 'enzyme';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';


describe('Create Entities', ()=>{
	const initialState = {entities: [], loginInfo: '', entity: []};
	const mockStore = configureStore();
	let store, wrapper;


	beforeEach(()=>{
        store = mockStore(initialState);
        wrapper = shallow( <Provider store={store}><EntityModal /></Provider> );
    });


	//white box test
	it('Create Entities - dispatch action to firebase', ()=>{
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
			type: 'GetEntitiesFromFirebase'
			,payload
		};

		store.dispatch(dispatchGetEntities(payload));
		expect(store.getActions()).toEqual([expectedAction]);
	});

	//white box test
	it('Before creating entities, the entities reducer should return the initial state', ()=>{
		expect(reducer(undefined, {})).toEqual([]);
	});

	//white box test
	it('Creating entites -> changing the entites reducer', ()=>{
		expect(reducer('',{
			type: 'GetEntitiesFromFirebase',
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