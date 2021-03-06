// Library Imports
import _ from 'lodash';

// Local Imports
import { MESSAGE_ACTION_TYPES } from '../actions/message_actions';

//--------------------------------------------------------------------//

/*
Data is in the form {
  userId1: [{
    id:            30,
    body:          hello world!,
    author_id:     1,
    connection_id: 0,
    created_at:    2018-01-18T23:48:06.000Z,
    updated_at:    2018-01-18T23:48:06.000Z,
    medium:        {mediumObj}
  }, {
    ...another message object
  }]
  userId2: {...
*/

const DEFAULT_STATE = {};

const MessagesReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {

    //--------------------------------------------------------------------//
    // Message Actions
    //--------------------------------------------------------------------//

    case MESSAGE_ACTION_TYPES.RECEIVE_MESSAGES:
      userId = action.data.userId;

      newState[userId]       = newState[userId]       || {};
      newState[userId].data  = newState[userId].data  || [];
      newState[userId].isEnd = newState[userId].isEnd || false;

      if (!action.data.isNew && action.data.messages.length < 20) {
        newState[userId].isEnd = true;
      }

      if (action.data.isNew) {
        newState[userId].data = action.data.messages.concat(newState[userId].data);
        newState[userId].data = newState[userId].data.filter((thing, index, self) => index === self.findIndex((t) => t.id === thing.id)); // prevents duplicates
      } else {
        newState[userId].data = newState[userId].data.concat(action.data.messages);
      }

      return newState;
    case MESSAGE_ACTION_TYPES.RECEIVE_MESSAGE:
      userId = action.data.userId;

      newState[userId]       = newState[userId]       || {};
      newState[userId].data  = newState[userId].data  || [];
      newState[userId].isEnd = newState[userId].isEnd || false;

      newState[userId].data.unshift(action.data.message);
      newState[userId].data = newState[userId].data.filter((thing, index, self) => index === self.findIndex((t) => t.id === thing.id));

      return newState;
    default:
      return state;
  }
};


//--------------------------------------------------------------------//

export default MessagesReducer;
