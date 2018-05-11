// Library Imports
import RNAmplitute from 'react-native-amplitude-analytics';

// Local Imports
import { ENV_TYPES, AMPLITUDE_ENV_SETTING } from '../app_config';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Helper Functions
//--------------------------------------------------------------------//

// Chooses the right API key depending on environment setting
let setupAmplitude = () => {
  let apiKey;

  if (AMPLITUDE_ENV_SETTING === ENV_TYPES.PRODUCTION) {
    apiKey = '3f58f3311c393ecb46e570c5b7b5aab8'; // key for animalparty-production
  } else {
    apiKey = '9f149135edcff158e44da661257c4610'; // key for animalparty-dev
  }

  return new RNAmplitute(apiKey)
};

//--------------------------------------------------------------------//
// Interface
//--------------------------------------------------------------------//


export const amplitude = setupAmplitude();
