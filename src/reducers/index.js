// combine the reducers 
import { combineReducers } from 'redux';

import {items, itemsHasErrored, itemsIsLoading} from './items';

const allReducers = combineReducers({
  items: items,
  itemsHasErrored,
  itemsIsLoading
});

export default allReducers;