import EntityContainer from '../src/containers/entity-container';

import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import { BrowserRouter, Link } from 'react-router-dom';



describe('Individual Entity card', ()=>{
	
	const mockStore = configureStore();
	let store, wrapper;

	beforeEach(()=>{
		const initialState = {entities: [], loginInfo: null, 
			entity: {
			anonymous: false,
			category: 'Classes',
			details: 'test',
			entityType: 'Poll',
			numUpVote:1,
			owner:'ethantest2@usc.edu',
			subject: 'test',
			tags: ['test'],
			timeCreatedAt: 'Wed Nov 08 2017 21:02:24 GMT-0800 (PST)',
			timeLimit: 'Wed Nov 08 2017 21:03:00 GMT-0800 (PST)',
			uid: 'c0XjKJxKQQMHeCX1uy1JKcQrWe02',
			whoVoted: {'-KyU97GqzM0pK00kO2E9': 'c0XjKJxKQQMHeCX1uy1JKcQrWe02'}
			}
		};
		store = mockStore(initialState);

        wrapper = mount( 
        <BrowserRouter>
			<Provider store={store}>
				<EntityContainer match={{params:{id: '-KyU9587fDK0VIo7CkkT'}}}/>
			</Provider>
		</BrowserRouter>);
    });

	//white box test
	it('Testing profile link', ()=>{
		
		wrapper.update();

		expect(wrapper.contains(<Link id='linkToProfile' to='/profile/c0XjKJxKQQMHeCX1uy1JKcQrWe02'>ethantest2@usc.edu</Link>))
			.toEqual(true);
	});

	//white box test
	// it('display time duration progress bar', ()=>{
		
	// 	wrapper.update();

	// 	// expect(wrapper.find('.progress'))
	// 	// 	.toHaveLength(1);
	// 	let instance = wrapper.find(EntityContainer);
	// 	expect(wrapper.state().showDurationBar)
	// 		.toEqual(true);
	// });

	//white box test
	it('if expired, all submit buttons should be disabled', ()=>{
		
		wrapper.update();
		
		let submitBtnProps = wrapper.find('#submitBtn').props();

		expect(submitBtnProps.disabled)
			.toEqual(true);

		expect(wrapper.contains(<span className="badge badge-success badge-vote"> <span className="glyphicon glyphicon-chevron-up">^</span> 1</span>))
			.toEqual(true);

	});



});