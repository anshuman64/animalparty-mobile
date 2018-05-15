// Library Imports
import _ from 'lodash';

// Local Imports
import { getFile }              from '../utilities/file_utility';
import { MEDIUM_ACTION_TYPES }  from '../actions/medium_actions';
import { MESSAGE_ACTION_TYPES } from '../actions/message_actions';

//--------------------------------------------------------------------//

/*
Data is in the form {
  mediumId1: {
    aws_path:    '2/messages/direct/24352j45kl-4235lhk4.jpg',
    mime_type:   'image/jpeg',
    height:      1600,
    width:       900,
    owner_id:    5,
    message_id:  null,
    created_at:  Date(),
    updated_at:  Date(),
    url:         'www.animalparty-public.com/asdlkalsdjkf'
    lastUpdated: Date()
  },
  mediumId2: { ...
*/

const DEFAULT_STATE = {};


// Takes an array or single object and returns an array with extracted media
const extractMedia = (object) => {
  let media = [];

  let addMedium = (obj) => {
    // If the object is a message with a medium
    if (obj.medium) {
      obj.medium.url = getFile(obj.medium.aws_path);
      media.push(obj.medium);
    }
  }

  if (Array.isArray(object)) {
    _.forEach(object, (obj) => {
      addMedium(obj);
    });
  } else {
    addMedium(object);
  }

  return media;
}

const MediaCacheReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  let checkAndUpdateMedia = (media) => {
    _.forEach(media, (medium) => {
      if (newState[medium.id] && newState[medium.id].lastUpdated) {
        let currentTime = new Date();
        let lastUpdate = newState[medium.id].lastUpdated;
        let minsDiff = (currentTime - lastUpdate) / (1000 * 60);

        if (minsDiff > 59) {
          medium.lastUpdated = new Date();
          newState[medium.id] = medium;
        }
      } else {
        medium.lastUpdated = new Date();
        newState[medium.id] = medium;
      }
    });
  }

  switch(action.type) {

    //--------------------------------------------------------------------//
    // Medium Actions
    //--------------------------------------------------------------------//

    case MEDIUM_ACTION_TYPES.RECEIVE_MEDIUM:
      checkAndUpdateMedia([action.data.medium]);

      return newState;

    //--------------------------------------------------------------------//
    // Message Actions
    //--------------------------------------------------------------------//

    case MESSAGE_ACTION_TYPES.RECEIVE_MESSAGES:
      media = extractMedia(action.data.messages);
      checkAndUpdateMedia(media);

      return newState;
    case MESSAGE_ACTION_TYPES.RECEIVE_MESSAGE:
      media = extractMedia(action.data.message);
      checkAndUpdateMedia(media);

      return newState;
    default:
      return state;
  }
};


//--------------------------------------------------------------------//

export default MediaCacheReducer;
