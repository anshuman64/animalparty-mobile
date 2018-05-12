// Library Imports
import { combineReducers } from 'redux';

// Local Imports
import ClientReducer        from './client_reducer.js';
import UsersCacheReducer    from './users_cache_reducer';
import ConnectionsReducer   from './connections_reducer';
import NavigationReducer    from './navigation_reducer.js';

//--------------------------------------------------------------------//

const RootReducer = combineReducers({
  client:        ClientReducer,
  usersCache:    UsersCacheReducer,
  connections:   ConnectionsReducer,
  navigation:    NavigationReducer,
});

//--------------------------------------------------------------------//

export default RootReducer;
