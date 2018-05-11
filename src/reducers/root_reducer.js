// Library Imports
import { combineReducers } from 'redux';

// Local Imports
import ClientReducer        from './client_reducer.js';
import NavigationReducer    from './navigation_reducer.js';

//--------------------------------------------------------------------//

const RootReducer = combineReducers({
  client:        ClientReducer,
  navigation:    NavigationReducer,
});

//--------------------------------------------------------------------//

export default RootReducer;
