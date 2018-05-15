// Library Imports
import React       from 'react';
import RN          from 'react-native';
import Firebase    from 'react-native-firebase';
import AWS         from 'aws-sdk/dist/aws-sdk-react-native';
import { Actions } from 'react-native-router-flux';

// Local Imports
import MenuListItemContainer from '../../components/menu_list_item/menu_list_item_container';
import { styles }            from './menu_screen_styles';
import { defaultErrorAlert } from '../../utilities/error_utility';

//--------------------------------------------------------------------//

/*
Required Screen Props:
  -
Optional Screen Props:
  -
*/
class MenuScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _logOut = () => {
    Firebase.auth().signOut()
      .then(() => {
        AWS.config.credentials.clearCachedId();
        AWS.config.credentials = null;
        Actions.reset('LoadingScreen');
      })
      .catch((error) => {
        defaultErrorAlert(error);
      });
  }

  _changeParty = () => {
    this.props.navigateTo('ChoosePartyScreen');
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    return (
      <RN.View style={styles.container}>
        <RN.View>
          <MenuListItemContainer iconName={'refresh'} text={'Change Party'}         callback={this._changeParty}/>
          <MenuListItemContainer iconName={'envelope'}    text={'Contact'}              callback={() => RN.Linking.openURL('mailto:contact@animalparty.app')}/>
          <MenuListItemContainer iconName={'paper-plane'} text={'Telegram Community'}   callback={() => RN.Linking.openURL('https://t.me/animalpartyapp')}/>
          <MenuListItemContainer iconName={'docs'}        text={'Terms of Use'}         callback={() => RN.Linking.openURL('https://medium.com/@InsiyaInc/terms-of-use-4b1c31695dfe')}/>
          <MenuListItemContainer iconName={'lock'}        text={'Privacy Policy'}       callback={() => RN.Linking.openURL('https://medium.com/@InsiyaInc/privacy-policy-febc9c4cb192')}/>
          <MenuListItemContainer iconName={'people'}      text={'Community Guidelines'} callback={() => RN.Linking.openURL('https://medium.com/@InsiyaInc/community-guidelines-b9ee2fe3daf4')}/>
          <MenuListItemContainer iconName={'logout'}      text={'Log Out'}              callback={this._logOut}/>
        </RN.View>
        <RN.Text allowFontScaling={false} style={styles.attributionText}>
          {'Icons made by Freepik from www.flaticon.com'}
        </RN.Text>
     </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default MenuScreen;
