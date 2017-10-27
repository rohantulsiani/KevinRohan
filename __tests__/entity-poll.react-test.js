import React from 'react';
import EntityPoll from '../src/components/entity-components/entity-poll';
import { shallow} from 'enzyme';
import { expect } from 'chai';


describe('entity-poll', ()=>{


	it('has a default state', ()=>{

		const props = {
			poll: {
				anonymous:true,
				option:false
			}
		};

		const wrapper = shallow(<EntityPoll {...props} />);
		expect(wrapper.length).to.equal(1);
	});
});