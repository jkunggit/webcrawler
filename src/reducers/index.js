// combine the reducers 
import { combineReducers } from 'redux';

import { items, itemsHasErrored, itemsIsLoading } from './items';
import { modal } from './modal';

const allReducers = combineReducers({
  items: items,
  itemsHasErrored,
  itemsIsLoading,
  modal
});

export default allReducers;