// Local Imports
import { amplitude }                                  from '../utilities/analytics_utility';
import * as APIUtility                                from '../utilities/api_utility';
import { setErrorDescription, refreshCredsAndResume } from '../utilities/error_utility';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//


export const CONNECTION_ACTION_TYPES = {
  RECEIVE_CONNECTIONS:        'RECEIVE_CONNECTIONS',
  RECEIVE_CONNECTION:         'RECEIVE_CONNECTION',
  REMOVE_CONNECTION:          'REMOVE_CONNECTION',
  PUSHER_RECEIVE_CONNECTION:  'PUSHER_RECEIVE_CONNECTION',
};

//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//

export const receiveConnections = (data) => {
  return { type: CONNECTION_ACTION_TYPES.RECEIVE_CONNECTIONS, data: data };
};

export const receiveConnection = (data) => {
  return { type: CONNECTION_ACTION_TYPES.RECEIVE_CONNECTION, data: data };
};

export const removeConnection = (data) => {
  return { type: CONNECTION_ACTION_TYPES.REMOVE_CONNECTION, data: data };
};

export const pusherRecieveConnection = (data) => {
  return { type: CONNECTION_ACTION_TYPES.PUSHER_RECEIVE_CONNECTION, data: data };
};

//--------------------------------------------------------------------//
// Asynchronous Actions
//--------------------------------------------------------------------//

export const getConnections = (authToken, firebaseUserObj) => (dispatch) => {
  return APIUtility.get(authToken, '/connections')
    .then((connections) => {
      dispatch(receiveConnections({ connections: connections }));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshCredsAndResume(firebaseUserObj, getConnections));
      }

      error = setErrorDescription(error, 'GET connections failed');
      amplitude.logEvent('Connection - Get Connections', { is_successful: false, error_description: error.description, error_message: error.message });
      throw error;
    });
};

export const requestConnection = (authToken, firebaseUserObj) => (dispatch) => {
  return APIUtility.post(authToken, '/connections')
    .then((user) => {
      amplitude.logEvent('Connection - Request Connection', { is_successful: true });
      dispatch(receiveConnection({ user: user }));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshCredsAndResume(firebaseUserObj, createFriendRequest));
      }

      error = setErrorDescription(error, 'POST for request connection failed');
      amplitude.logEvent('Connection - Request Connection', { is_successful: false, error_description: error.description, error_message: error.message });
      throw error;
    });
};

// export const deleteConnection = (authToken, firebaseUserObj, userId) => (dispatch) => {
//   return APIUtility.del(authToken, '/connections/' + userId)
//     .then((friendship) => {
//       amplitude.logEvent('Connection - Delete Connection', { is_successful: true, status: friendship.status });
//       return friendship;
//     })
//     .catch((error) => {
//       if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
//         return dispatch(refreshCredsAndResume(firebaseUserObj, deleteConnection, userId));
//       }
//
//       error = setErrorDescription(error, 'DEL friendship failed');
//       amplitude.logEvent('Connection - Delete Connection', { is_successful: false, error_description: error.description, error_message: error.message });
//       throw error;
//     });
// };
