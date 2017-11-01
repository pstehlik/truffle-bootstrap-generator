
import React from 'react';
import SingleTruffleAbi from './SingleTruffleAbi';

import contract from 'truffle-contract';
import { expect } from 'chai';

import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    const wrapper = shallow(
    <SingleTruffleAbi 
    abi={{inputs:[], outputs:[]}}
    />
);
});
 