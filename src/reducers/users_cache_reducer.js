// Library Imports
import _ from 'lodash';

// Local Imports
import { CLIENT_ACTION_TYPES }     from '../actions/client_actions';
import { CONNECTION_ACTION_TYPES } from '../actions/connection_actions';
import { MESSAGE_ACTION_TYPES }    from '../actions/message_actions';

//--------------------------------------------------------------------//

/*
Data is in the form {
  userId1: {
    id:                            30,
    firebase_uid:                  jhlakjsdhfalkjyewou,
    phone_number:                  '+14082551245',
    email:                         null,
    political_party:               'DEMOCRAT',
    is_banned:                     false,
    last_login:                    Date(),
    queued_at:                     Date(),
    created_at:                    Date(),
    updated_at:                    Date(),
    peek_message:                  {messageObj}
  },
  userId2: {...
*/

const DEFAULT_STATE = {};

const UsersCacheReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {

    //--------------------------------------------------------------------//
    // Client Actions
    //--------------------------------------------------------------------//

    case CLIENT_ACTION_TYPES.RECEIVE_CLIENT:
      newState[action.data.client.id] = action.data.client;

      return newState;

    //--------------------------------------------------------------------//
    // Connection Actions
    //--------------------------------------------------------------------//

    case CONNECTION_ACTION_TYPES.RECEIVE_CONNECTIONS:
      connections = action.data.connections;

      _.forEach(connections, (connection) => {
        newState[connection.id] = connection;
      });

      return newState;
    case CONNECTION_ACTION_TYPES.RECEIVE_CONNECTION:
      user = action.data.user;
      clientId = action.data.clientId;

      newState[user.id] = user;

      if (user.id != clientId) {
        newState[clientId].queued_at = null;
      }

      return newState;

    //--------------------------------------------------------------------//
    // Message Actions
    //--------------------------------------------------------------------//

    case MESSAGE_ACTION_TYPES.RECEIVE_MESSAGE:
      userId = action.data.userId;
      newState[userId].peek_message = action.data.message;

      return newState;
    case MESSAGE_ACTION_TYPES.RECEIVE_MESSAGES:
      userId = action.data.userId;
      messages = action.data.messages;

      if (action.data.isNew && messages.length != 0) {
        newState[userId].peek_message = messages[0];
      }

      return newState;
    default:
      return state;
  }
};


//--------------------------------------------------------------------//

export default UsersCacheReducer;
