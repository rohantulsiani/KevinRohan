//enzyme set-up
import {firebaseInit} from './src/firebase';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-14';
import $ from 'jquery';

global.$ = global.jQuery = $;


firebaseInit();

configure({ adapter: new Adapter() });