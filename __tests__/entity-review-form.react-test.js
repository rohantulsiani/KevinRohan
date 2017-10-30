import EntityCommentForm from '../src/components/entity-components/entity-comment-form';

import React from 'react';
import sinon from 'sinon';
import {mount} from 'enzyme';
import { expect } from 'chai';


describe('Entity Comment Form', ()=>{
	let wrapper;

	const submit = sinon.spy();
	const props = {
		createEntityComment: submit,
		entity:{
			entityType: 'Poll',
		},
		entityId: 'id',
		user:{
			uid: 'ethan',
			email: 'ethantest@usc.edu'
		},
		comment: ['test1', 'test2'],
		anon: true
	};

	beforeEach(()=>{
        wrapper = mount( <EntityCommentForm {...props} />);
    });

	//white box test
	it('write submit comment', ()=>{
		
		const e = {
			target:{
				value: 'testing writing comment'
			}
		};
		wrapper.instance().commentChange(e);

		expect(wrapper.state().comment).to.equal('testing writing comment');
	});

	//white box test 
	it('submit comment', ()=>{
		
		const e = {
			target:{
				value: 'testing writing comment'
			},
			preventDefault: jest.fn()
		};

		wrapper.instance().submitComment(e);

		expect(submit).to.have.property('callCount', 1);
	});
});
