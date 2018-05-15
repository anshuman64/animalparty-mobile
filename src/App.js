// Library Imports
import React                    from 'react';
import RN                       from 'react-native';
import { Provider }             from 'react-redux';
import { Scene, Tabs, Actions } from 'react-native-router-flux';

// Local Imports
import { amplitude }               from './utilities/analytics_utility';
import configureStore              from './store';
import RouterContainer             from './router/router_container';

import DebugLoginScreenContainer   from './screens/debug_login_screen/debug_login_screen_container';
import LoadingScreenContainer      from './screens/loading_screen/loading_screen_container';
import WelcomeScreenContainer      from './screens/welcome_screen/welcome_screen_container';
import LoginScreenContainer        from './screens/login_screen/login_screen_container';
import ConfirmCodeScreenContainer  from './screens/confirm_code_screen/confirm_code_screen_container';
import ChoosePartyScreenContainer  from './screens/choose_party_screen/choose_party_screen_container';
import HomeScreenContainer         from './screens/home_screen/home_screen_container';
import MessagesScreenContainer     from './screens/messages_screen/messages_screen_container';
import MenuScreenContainer         from './screens/menu_screen/menu_screen_container';

import HeaderContainer             from './components/header/header_container';

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

    if (currentScene === 'LoginScreen'
        || currentScene === 'ChoosePartyScreenLogin'
        || currentScene === 'LoadingScreen'
        || currentScene === 'WelcomeScreen'
        || currentScene === 'HomeScreen') {
      RN.BackHandler.exitApp();
      return false;
    }

    Actions.pop();
    return true;
  };

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    return (
      <Provider store={ this.store }>
        <RouterContainer>
          <Scene key='root' headerMode={'screen'} >
            <Scene key='DebugLoginScreen'       component={DebugLoginScreenContainer}  panHandlers={null} hideNavBar={true} />
            <Scene key='LoadingScreen'          component={LoadingScreenContainer}     panHandlers={null} hideNavBar={true} initial={true}/>
            <Scene key='WelcomeScreen'          component={WelcomeScreenContainer}     panHandlers={null} hideNavBar={true} />
            <Scene key='LoginScreen'            component={LoginScreenContainer}       panHandlers={null} hideNavBar={true} />
            <Scene key='ChoosePartyScreenLogin' component={ChoosePartyScreenContainer} panHandlers={null} hideNavBar={true} />
            <Scene key='ChoosePartyScreen'      component={ChoosePartyScreenContainer} panHandlers={null} hideNavBar={true} />
            <Scene key='MessagesScreen'         component={MessagesScreenContainer}    panHandlers={null} hideNavBar={true} />

            <Scene key='HomeScreen'             component={HomeScreenContainer}        panHandlers={null} navBar={() => <HeaderContainer logo={true} settingsIcon={true} homeScreenButton={true} />} />
            <Scene key='ConfirmCodeScreen'      component={ConfirmCodeScreenContainer} panHandlers={null} navBar={() => <HeaderContainer backTitle={'Confirm Code'} backIcon={true} />}  />
            <Scene key='MenuScreen'             component={MenuScreenContainer}                 panHandlers={null} navBar={() => <HeaderContainer backTitle={'Settings'}     backIcon={true} />} />
          </Scene>
        </RouterContainer>
      </Provider>
    );
  }
}


//--------------------------------------------------------------------//

export default App;
