import { combineReducers } from 'redux';

import user_id from '../user_id/reducer';
import user_info from '../user_info/reducer';
import challenges from '../challenges/reducer';

const reducers = {
  user_id,
  user_info,
  challenges,
};

export default combineReducers(reducers);
