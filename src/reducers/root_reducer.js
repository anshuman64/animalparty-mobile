// Library Imports
import { combineReducers } from 'redux';

// Local Imports
import ClientReducer        from './client_reducer.js';
import UsersCacheReducer    from './users_cache_reducer';
import NavigationReducer    from './navigation_reducer.js';

//--------------------------------------------------------------------//

const RootReducer = combineReducers({
  client:        ClientReducer,
  usersCache:    UsersCacheReducer,
  navigation:    NavigationReducer,
});

//--------------------------------------------------------------------//

export default RootReducer;
