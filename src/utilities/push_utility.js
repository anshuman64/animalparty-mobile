// Library Imports
import Pusher    from 'pusher-js/react-native';
import OneSignal from 'react-native-onesignal';

// Local Imports
import { ENV_TYPES, PUSHER_ENV_SETTING } from '../app_config';
import { getBaseUrl }                    from './api_utility';
import { receiveConnection, removeConnection }       from '../actions/connection_actions';
import { receiveMessage }                from '../actions/message_actions';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//

export let pusher    = null;
let myChannel = null;

//--------------------------------------------------------------------//
// Helpers
//--------------------------------------------------------------------//

let getPusherApiKey = () => {
  let apiKey;

  if (PUSHER_ENV_SETTING === ENV_TYPES.PRODUCTION) {
    apiKey = '81adc7d362a42675a58c'; // key for animalparty-production
  } else if (PUSHER_ENV_SETTING === ENV_TYPES.TEST) {
    apiKey = '40d65a2bc02d7c20f2ff'; // key for animalparty-production
  } else {
    apiKey = 'a6d1856c0f4314516333'; // key for animalparty-dev
  }

  return apiKey;
};

//--------------------------------------------------------------------//
// Pusher Interface
//--------------------------------------------------------------------//

// Enable pusher logging
Pusher.logToConsole = true;

export const setPusherClient = (authToken, clientId) => (dispatch) => {
  pusher = new Pusher(getPusherApiKey(), {
    authEndpoint: getBaseUrl() + '/pusher/auth',
    cluster: 'us2',
    encrypted: true,
    auth: {
      headers: {
        Authorization: 'Bearer ' + authToken,
      }
    }
  });

  myChannel = pusher.subscribe('private-' + clientId);

  // NOTE: the 'user' sending the Pusher message is defined as us, the 'client'.
  myChannel.bind('receive-connection', (data) => {
    dispatch(receiveConnection({ user: data.client, clientId: data.user_id }));
  });

  // NOTE: the 'user' sending the Pusher message is defined as us, the 'client'.
  myChannel.bind('destroy-connection', (data) => {
    dispatch(removeConnection({ userId: data.client_id }));
  });

  // NOTE: the 'user' sending the Pusher message is defined as us, the 'client'.
  myChannel.bind('receive-message', (data) => {
    dispatch(receiveMessage({ userId: data.client_id, message: data.message }));
  });
}

//--------------------------------------------------------------------//
// OneSignal Interface
//--------------------------------------------------------------------//

// OneSignal options
OneSignal.inFocusDisplaying(0); // Disables notifications in-app
