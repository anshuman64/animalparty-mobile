// Local Imports
import { amplitude }                                  from '../utilities/analytics_utility';
import * as APIUtility                                from '../utilities/api_utility';
import { setErrorDescription, refreshCredsAndResume } from '../utilities/error_utility';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//

export const CONNECTION_ACTION_TYPES = {
  RECEIVE_CONNECTIONS: 'RECEIVE_CONNECTIONS',
  RECEIVE_CONNECTION:  'RECEIVE_CONNECTION',
  REMOVE_CONNECTION:   'REMOVE_CONNECTION',
};

//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//

// connections (array of users): array of users that the client has connected with
export const receiveConnections = (data) => {
  return { type: CONNECTION_ACTION_TYPES.RECEIVE_CONNECTIONS, data: data };
};

// user (user object): either 1) the user the client has connected with or 2) the client with updated queued_at
// clientId (int): id of client to figure out if user is #1 or #2
export const receiveConnection = (data) => {
  return { type: CONNECTION_ACTION_TYPES.RECEIVE_CONNECTION, data: data };
};

// userId (int): user id of user to be removed
export const removeConnection = (data) => {
  return { type: CONNECTION_ACTION_TYPES.REMOVE_CONNECTION, data: data };
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

export const requestConnection = (authToken, firebaseUserObj, clientId) => (dispatch) => {
  return APIUtility.post(authToken, '/connections')
    .then((user) => {
      amplitude.logEvent('Connection - Request Connection', { is_successful: true });
      dispatch(receiveConnection({ user: user, clientId: clientId }));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshCredsAndResume(firebaseUserObj, createFriendRequest, clientId));
      }

      error = setErrorDescription(error, 'POST for request connection failed');
      amplitude.logEvent('Connection - Request Connection', { is_successful: false, error_description: error.description, error_message: error.message });
      throw error;
    });
};

export const deleteConnection = (authToken, firebaseUserObj, userId) => (dispatch) => {
  return APIUtility.del(authToken, '/connections/' + userId)
    .then((user) => {
      amplitude.logEvent('Connection - Delete Connection', { is_successful: true });
      dispatch(removeConnection({ userId: userId }));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshCredsAndResume(firebaseUserObj, deleteConnection, userId));
      }

      error = setErrorDescription(error, 'DEL friendship failed');
      amplitude.logEvent('Connection - Delete Connection', { is_successful: false, error_description: error.description, error_message: error.message });
      throw error;
    });
};
