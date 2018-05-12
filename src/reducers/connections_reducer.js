// Library Imports
import _ from 'lodash';

// Local Imports
import { CONNECTION_ACTION_TYPES } from '../actions/connection_actions';
// import { MESSAGE_ACTION_TYPES }    from '../actions/message_actions';

//--------------------------------------------------------------------//

const DEFAULT_STATE = {
  connections: [],
};

const ConnectionsReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {

    case CONNECTION_ACTION_TYPES.RECEIVE_CONNECTIONS:
      newState.connections = action.data.connections.map((x) => x.id);

      return newState;

    // //--------------------------------------------------------------------//
    // // Friendship Actions
    // //--------------------------------------------------------------------//
    //
    // case CONNECTION_ACTION_TYPES.ACCEPT_CONNECTION_REQUEST:
    //   userId = action.data.friendship.requester_id;
    //
    //   newState.connections.unshift(userId);
    //
    //   return newState;
    // // Since we don't know if user is requester or requestee, delete ids for both
    // case CONNECTION_ACTION_TYPES.REMOVE_CONNECTION:
    //   _.remove(newState.connections, (ids) => {
    //     return ids === action.data.friendship.requester_id;
    //   });
    //
    //   _.remove(newState.connections, (ids) => {
    //     return ids === action.data.friendship.requestee_id;
    //   });
    //
    //   return newState;

    // //--------------------------------------------------------------------//
    // // Pusher Friendship Actions
    // //--------------------------------------------------------------------//
    //
    // case CONNECTION_ACTION_TYPES.PUSHER_RECEIVE_ACCEPTED_CONNECTION:
    //   userId = action.data.user.id;
    //
    //   newState.connections.unshift(userId);
    //
    //   return newState;
    //
    // //--------------------------------------------------------------------//
    // // Group Actions
    // //--------------------------------------------------------------------//
    //
    // case GROUP_ACTION_TYPES.RECEIVE_GROUP:
    //   group = action.data.group;
    //
    //   newState.connections.unshift(-1 * group.id);
    //
    //   return newState;
    // case GROUP_ACTION_TYPES.REMOVE_GROUP:
    //   groupId = action.data.groupId;
    //
    //   _.remove(newState.connections, (ids) => {
    //     return ids === -1 * groupId;
    //   });
    //
    //   return newState;
    //
    // //--------------------------------------------------------------------//
    // // Message Actions
    // //--------------------------------------------------------------------//
    //
    // case MESSAGE_ACTION_TYPES.RECEIVE_MESSAGE:
    //   convoId = action.data.convoId;
    //
    //   _.remove(newState.connections, (ids) => {
    //     return ids === convoId;
    //   });
    //
    //   newState.connections.unshift(convoId);
    //
    //   return newState;
    default:
      return state;
  }
};


//--------------------------------------------------------------------//

export default ConnectionsReducer;
