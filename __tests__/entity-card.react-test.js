import EntityCard from '../src/components/entity-components/entity-card';

import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import { BrowserRouter, Link } from 'react-router-dom';



describe('Individual Entity card', ()=>{
	let wrapper;


	beforeEach(()=>{
        wrapper = mount( <BrowserRouter><EntityCard entity={{subject: 'testing', type: 'poll', user:true}} entityId='id'/></BrowserRouter>);
    });

	//white box test
	it('upvote funciton', ()=>{

		const jsx = wrapper.find('EntityCard').instance().UpVote(false, 3, 'id', 'ethantest@usc.edu', 'entityid');

		expect(jsx).toBeTruthy();
	});

	//white box test
	it('downvote funciton', ()=>{

		const jsx = wrapper.find('EntityCard').instance().DownVote(false, 3, 'id', 'ethantest@usc.edu', 'entityid');

		expect(jsx).toBeTruthy();
	});

});