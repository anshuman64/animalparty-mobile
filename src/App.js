// Library Imports
import React                    from 'react';
import RN                       from 'react-native';
import { Provider }             from 'react-redux';
import { Scene, Tabs, Actions } from 'react-native-router-flux';

// Local Imports
import { amplitude }               from './utilities/analytics_utility';
import configureStore              from './store';
import RouterContainer             from './router/router_container';

import LoginScreenContainer        from './screens/login_screen/login_screen_container';

//--------------------------------------------------------------------//

class App extends React.Component {
  store = configureStore();

  constructor() {
    super();

    amplitude.logEvent('App - Open App');
    currentAppState = 'active';
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  // Listens to changes in AppState and when Android backButton is pressed
  // NOTE: don't try to move these to LoadingScreen--it doesn't work!
  componentDidMount() {
    RN.AppState.addEventListener('change', this._handleAppStateChange);
    RN.BackHandler.addEventListener("hardwareBackPress", this._onBackPress);
  }

  componentWillUnmount() {
    RN.AppState.removeEventListener('change', this._handleAppStateChange);
    RN.BackHandler.removeEventListener("hardwareBackPress", this._onBackPress);
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  // When AppState changes, log event
  _handleAppStateChange = (nextAppState) => {
    if (currentAppState.match(/inactive|background/) && nextAppState === 'active') {
      amplitude.logEvent('App - Focus App');
    } else if (nextAppState.match(/inactive|background/) && currentAppState === 'active') {
      amplitude.logEvent('App - Minimize App');
    }

    currentAppState = nextAppState;
  }

  // When on the screens listed, close the app. Else, go back one screen.
  _onBackPress = () => {
    let currentScene = Actions.currentScene.replace(/^_/, '');

    if (currentScene === 'LoginScreen') {
      RN.BackHandler.exitApp();
      return false;
    }

    Actions.pop();
    return true;
  };

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  // _renderHeader = (backTitle, backIcon) => {
  //   return () => {
  //     return (
  //       <HeaderContainer backTitle={backTitle} backIcon={backIcon} />
  //     );
  //   };
  // }

  //WARNING/NOTE: All screens with PostLists have to be on different screens for performance benefits
  render() {
    return (
      <Provider store={ this.store }>
        <RouterContainer>
          <Scene key='root' headerMode={'screen'} >
            <Scene key='LoginScreen'           component={LoginScreenContainer}        panHandlers={null} hideNavBar={true} />
          </Scene>
        </RouterContainer>
      </Provider>
    );
  }
}


//--------------------------------------------------------------------//

export default App;
