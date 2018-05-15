// Library Imports
import _ from 'lodash';

// Local Imports
import { CONNECTION_ACTION_TYPES } from '../actions/connection_actions';
import { MESSAGE_ACTION_TYPES }    from '../actions/message_actions';

//--------------------------------------------------------------------//

const DEFAULT_STATE = {
  connections: [],
};

const ConnectionsReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {

    //--------------------------------------------------------------------//
    // Connection Actions
    //--------------------------------------------------------------------//

    case CONNECTION_ACTION_TYPES.RECEIVE_CONNECTIONS:
      newState.connections = action.data.connections.map((x) => x.id);

      return newState;
    case CONNECTION_ACTION_TYPES.RECEIVE_CONNECTION:
      userId = action.data.user.id;

      if (userId != action.data.clientId) {
        newState.connections.unshift(action.data.user.id);
      }

      return newState;
    case CONNECTION_ACTION_TYPES.REMOVE_CONNECTION:
      userId = action.data.userId;

      _.remove(newState.connections, (ids) => {
        return ids === userId;
      });

      return newState;

    //--------------------------------------------------------------------//
    // Message Actions
    //--------------------------------------------------------------------//

    case MESSAGE_ACTION_TYPES.RECEIVE_MESSAGE:
      userId = action.data.userId;

      _.remove(newState.connections, (ids) => {
        return ids === userId;
      });

      newState.connections.unshift(userId);

      return newState;
    default:
      return state;
  }
};


//--------------------------------------------------------------------//

export default ConnectionsReducer;
