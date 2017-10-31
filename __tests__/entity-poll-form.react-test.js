import React from 'react';
import EntityPollForm from '../src/components/entity-components/entity-poll-form';
import { expect } from 'chai';
import sinon from 'sinon';
import {mount} from 'enzyme';


describe('entity-poll', ()=>{
	let wrapper;

	const createPollResponse = sinon.spy();
	
	const checkPollResponseExists = sinon.stub();
	checkPollResponseExists.resolves(true);
	
	const props = {
		createPollResponse,
		checkPollResponseExists,
		entity:{
			entityType: 'Poll',
		},
		entityId: 'id',
		user:{
			uid: 'ethan',
			email: 'ethantest@usc.edu'
		},
		options: ['test1', 'test2'],
		anon: true
	};
	beforeEach(()=>{
        wrapper = mount( <EntityPollForm {...props}/>);
    });

	//white box test
	it('submit poll', async ()=>{

		const e = {
			target:{
				value: 'testing writing comment'
			},
			preventDefault: jest.fn()
		};

		
		await wrapper.instance().submitPoll(e);

		expect(checkPollResponseExists).to.have.property('callCount', 1);
	});
});