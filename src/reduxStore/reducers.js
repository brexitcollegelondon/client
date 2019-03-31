import { combineReducers } from 'redux';

import user_info from '../user_info/reducer';
import challenges from '../challenges/reducer';
import create from '../create/reducer';

const reducers = {
  user_info,
  challenges,
  create,
};

export default combineReducers(reducers);
