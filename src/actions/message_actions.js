// Local Imports
import { amplitude }                                  from '../utilities/analytics_utility';
import * as APIUtility                                from '../utilities/api_utility';
import { setErrorDescription, refreshCredsAndResume } from '../utilities/error_utility';
import { uploadFile }                                 from '../utilities/file_utility';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//

export const MESSAGE_ACTION_TYPES = {
  RECEIVE_MESSAGES:           'RECEIVE_MESSAGES',
  RECEIVE_MESSAGE:            'RECEIVE_MESSAGE',
};

//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//

// messages (array): array of messages in conversation with user
// userId (int): id of user
// isNew (bool): bool if messsages are new messages or older ones
export const receiveMessages = (data) => {
  return { type: MESSAGE_ACTION_TYPES.RECEIVE_MESSAGES, data: data };
};

// userId (int): id of user
// message (message object): message object of created message
export const receiveMessage = (data) => {
  return { type: MESSAGE_ACTION_TYPES.RECEIVE_MESSAGE, data: data };
};

//--------------------------------------------------------------------//
// Asynchronous Actions
//--------------------------------------------------------------------//

export const getMessages = (authToken, firebaseUserObj, isNew, userId, queryParams) => (dispatch) => {
  return APIUtility.get(authToken, '/messages/direct/' + userId, queryParams)
    .then((messages) => {
      dispatch(receiveMessages({ messages: messages, userId: userId, isNew: isNew }));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshCredsAndResume(firebaseUserObj, getMessages, isNew, userId, queryParams));
      }

      error = setErrorDescription(error, 'GET messages failed');
      amplitude.logEvent('Messages - Get Messages', { is_successful: false, error_description: error.description, error_message: error.message });
      throw error;
    });
};

export const createMessage = (authToken, firebaseUserObj, clientId, userId, messageBody, messageMedium) => (dispatch) => {
  let postMessageError = (error) => {
    error = setErrorDescription(error, 'POST message failed');
    amplitude.logEvent('Messages - Create Message', { is_successful: false, body: messageBody, media: messageMedium ? true : false, error_description: error.description, error_message: error.message });
    throw error;
  }

  let postMessage = (updatedMedium) => {
    return APIUtility.post(authToken, '/messages/direct/', { body: messageBody, medium: updatedMedium, user_id: userId })
      .then((newMessage) => {
        amplitude.logEvent('Messages - Create Message', { is_successful: true, body: messageBody, media: messageMedium ? true : false });
        dispatch(receiveMessage({ message: newMessage, userId: userId }));
      })
      .catch((error) => {
        if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
          return dispatch(refreshCredsAndResume(firebaseUserObj, createMessage, clientId, userId, messageBody, messageMedium));
        }

        postMessageError(error);
      });
  }

  if (messageMedium) {
    return dispatch(uploadFile(authToken, firebaseUserObj, clientId, 'messages/direct/' + userId + '/', messageMedium))
      .then((updatedMedium) => {
        return postMessage(updatedMedium);
      })
      .catch((error) => {
        postMessageError(error);
      });
  } else {
    return postMessage();
  }
};
