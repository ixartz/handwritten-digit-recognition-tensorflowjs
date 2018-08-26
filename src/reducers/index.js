import { combineReducers } from 'redux';
import chart from './chart';
import drawing from './drawing';
import mnist from './mnist';
import pipeline from './pipeline';

export default combineReducers({
  drawing,
  pipeline,
  mnist,
  chart,
});
