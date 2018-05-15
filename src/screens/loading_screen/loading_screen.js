// Library Imports
import React           from 'react';
import RN              from 'react-native';
import Firebase        from 'react-native-firebase';
import * as Animatable from 'react-native-animatable';
import OneSignal       from 'react-native-onesignal';

// Local Imports
import { amplitude }           from '../../utilities/analytics_utility';
import { styles, flipIcon }    from './loading_screen_styles';
import { defaultErrorAlert }   from '../../utilities/error_utility';
import { UTILITY_STYLES }      from '../../utilities/style_utility';

//--------------------------------------------------------------------//

/*
Required Screen Props:
  -
Optional Screen Props:
  -
*/
class LoadingScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.isAnimationEnd          = false;
    this.isLoggedIn              = false;
    this.navigateToNotification  = null;
    this.navigateToMessages      = null;
    this.currentAppState         = 'active';
    this.lastUpdate              = new Date();
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  componentWillMount() {
    RN.AppState.addEventListener('change', this._handleAppStateChange);
    OneSignal.addEventListener('opened', this._onOpened);
  }

  // Automatically detects login cookie from Firebase and logs in user
  componentDidMount() {
    this.unsubscribe = Firebase.auth().onAuthStateChanged((firebaseUserObj) => {
      if (firebaseUserObj) {
        // console.log('Firebase cookie found'); // Debug Test
        this.props.loginClient(firebaseUserObj)
          .then(() => {
            client = this.props.usersCache[this.props.client.id];
            // console.log('Logged in'); // Debug Test
            if (client.is_banned) {
              RN.Alert.alert('', 'This account has been disabled. Email support@animalparty.app for more info.', [{text: 'OK', style: 'cancel'}]);
            } else {
              this.props.getConnections(this.props.client.authToken, this.props.client.firebaseUserObj)
                .then(() => {
                  // console.log('Data loaded'); // Debug Test
                  this._onLogin();
                })
                .catch((error) => {
                  defaultErrorAlert(error);
                });
            }
          })
          .catch((error) => {
            defaultErrorAlert(error);
          });
      } else {
        // console.log('No Firebase cookie found'); // Debug Test
        this._onAnimationEnd();
      }
    });
  }

  componentWillUnmount() {
    RN.AppState.removeEventListener('change', this._handleAppStateChange);
    OneSignal.removeEventListener('opened', this._onOpened);
  }

  //--------------------------------------------------------------------//
  // Private Methods
  //--------------------------------------------------------------------//

  _navigateFromLoading = () => {
    // Make sure you are logged in
    if (this.isLoggedIn) {
      let client = this.props.usersCache[this.props.client.id];

      if (this.navigateToNotification) {
        // If opening app via notification, go to the screen you intended to go to
        if (this.navigateToNotification === 'MessagesScreen') {
          this.props.navigateTo('HomeScreen'); // NOTE: leave this here so that MessageScreen back doesn't go to login screen
          this.props.navigateTo('MessagesScreen', { userId: this.navigateToMessages });
        } else {
          this.props.navigateTo(this.navigateToNotification);
        }

        this.navigateToNotification = null;
        this.navigateToMessages     = null;
      } else if (client && client.political_party) {
        // If opening the app normally, go to HomeScreen.
        this.props.navigateTo('HomeScreen'); // Debug Test: should be HomeScreen
      } else if (client && !client.political_party) {
        // If opening the app normally and haven't selected party, go to ChoosePartyScreen
        this.props.navigateTo('ChoosePartyScreenLogin', { isLogin: true });
      } else {
        // If haven't logged in and somehow on LoadingScreen, go to WelcomeScreen
        this.props.navigateTo('WelcomeScreen');
      }
    } else if (!this.navigateToNotification) {
      // If haven't logged in and somehow on LoadingScreen, go to WelcomeScreen
      this.props.navigateTo('WelcomeScreen'); // Debug Test: should be WelcomeScreen
    }
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  // When refocusing app and logged in, reload data after 1 min
  _handleAppStateChange = (nextAppState) => {
    if (this.currentAppState.match(/inactive|background/) && nextAppState === 'active' && this.isLoggedIn) {
      // If you pressed back and are refocusing, end up on HomeScreen
      if (this.props.currentScreen === 'LoadingScreen' || this.navigateToNotification) {
        this._navigateFromLoading();
      }

      let currentTime = new Date();
      let minsDiff = (currentTime - this.lastUpdate) / (1000 * 60);

      if (minsDiff > 1) {
        this.props.getConnections(this.props.client.authToken, this.props.client.firebaseUserObj);
        this.lastUpdate = new Date();
      }
    }

    this.currentAppState = nextAppState;
  }

  _onOpened = (openResult) => {
    let data = openResult.notification.payload.additionalData;

    switch (data.type) {
      case 'receive-connection':
        amplitude.logEvent('Notifications - Receive Connection', { is_opened: true });
        this.navigateToNotification = 'HomeScreen';
        break;
      case 'receive-message':
        amplitude.logEvent('Notifications - Receive Message', { is_opened: true });
        this.navigateToNotification = 'MessagesScreen';
        this.navigateToMessages     = data.client_id;
        break;
      default:
        amplitude.logEvent('Notifications - Unknown', { is_opened: true });
        this.navigateToNotification = 'HomeScreen';
    }
  }

  _onLogin = () => {
    if (this.unsubscribe) {
      this.unsubscribe();
    }

    this.isAnimationEnd = true;
    this.isLoggedIn     = true;

    this._navigateFromLoading();
  }

  _onAnimationEnd = () => {
    if (this.isAnimationEnd) {
      return;
    }

    this.isAnimationEnd = true;
    this._navigateFromLoading();
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderLoadingIcon() {
    return (
      <Animatable.Image
        ref={'loadingIcon'}
        style={styles.icon}
        source={require('../../assets/images/icon/icon.png')}
        resizeMode={'cover'}
        animation={flipIcon}
        direction={'normal'}
        easing={'ease-in-out'}
        duration={1500}
        iterationCount={20}
        onAnimationEnd={this._onAnimationEnd}
        />
    )
  }

  render() {
    return (
      <RN.View style={[UTILITY_STYLES.containerCenter, {backgroundColor: 'white'}]}>
        {this._renderLoadingIcon()}
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default LoadingScreen;
