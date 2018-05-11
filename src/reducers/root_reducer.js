// Library Imports
import { combineReducers } from 'redux';

// Local Imports
import ClientReducer        from './client_reducer.js'

//--------------------------------------------------------------------//

const RootReducer = combineReducers({
  client:        ClientReducer,
});

//--------------------------------------------------------------------//

export default RootReducer;
