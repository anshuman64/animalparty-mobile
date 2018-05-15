// Library Imports
import _ from 'lodash';

//--------------------------------------------------------------------//
// Interface
//--------------------------------------------------------------------//

// Checks if string is empty (null, blank, or spaces only)
export const isStringEmpty = (string) => {
  return !string || string.length === 0 || !string.trim();
};

// Gets a random integer between 0 and max
export const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

// Callback function to set state on current component
export const setStateCallback = (component, state) => {
  return () => {
    component.setState(state);
  };
};
