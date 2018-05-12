import { Keyboard } from 'react-native';
import { Actions }  from 'react-native-router-flux';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Helper Functions
//--------------------------------------------------------------------//

// Ensures keyboard is dismissed before navigating to next screen
let dismissKeyBoard = () => {
  return new Promise((resolve, reject) => {
    Keyboard.dismiss();
    setTimeout(() => resolve(), 1);
  });
};

//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//

// Navigates to particular screen and sends props. Dismisses keyboard before navigating.
export const navigateTo = (screen, props) => (dispatch) => {
  let navigateScreens = () => {
    if (screen === 'LoadingScreen') {
      Actions.LoadingScreen(props)
    } else if (screen === 'LoginScreen') {
      Actions.LoginScreen(props)
    } else if (screen === 'WelcomeScreen') {
      Actions.WelcomeScreen(props)
    } else if (screen === 'ConfirmCodeScreen') {
      Actions.ConfirmCodeScreen(props)
    } else if (screen === 'ChoosePartyScreen') {
      Actions.ChoosePartyScreen(props)
    } else if (screen === 'HomeScreen') {
      Actions.HomeScreen(props)
    } else if (screen === 'MessagesScreen') {
      Actions.MessagesScreen(props)
    } else if (screen === 'MenuScreen') {
      Actions.MenuScreen(props)
    } else {
      return;
    }
  }

  let checkRefresh = () => {
    if (screen === Actions.currentScene.replace(/^_/, '')) {
      Actions.refresh(props);
    } else {
      navigateScreens();
    }
  }

  if (Actions.currentScene === 'LoginScreen'
      || Actions.currentScene === 'ConfirmCodeScreen') {
    dismissKeyBoard()
      .then(() => {
        checkRefresh();
      })
  } else {
    checkRefresh();
  }
}

// Pops top of stack. If props, refreshes screen with props (only way sending props works).
export const goBack = (props) => (dispatch) => {
  dismissKeyBoard();
  Actions.pop();

  if (props) {
    Actions.refresh(props);
  }
}
