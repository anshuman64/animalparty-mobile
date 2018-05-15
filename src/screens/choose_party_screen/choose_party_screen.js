// Library Imports
import React from 'react';
import RN    from 'react-native';
import * as Animatable from 'react-native-animatable';

// Local Imports
import HeaderContainer                    from '../../components/header/header_container';
import { styles }         from './choose_party_screen_styles';
import { defaultErrorAlert } from '../../utilities/error_utility';
import { UTILITY_STYLES, COLORS } from '../../utilities/style_utility';

//--------------------------------------------------------------------//

/*
Required Screen Props:
  -
Optional Screen Props:
  -
*/
class ChoosePartyScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.isSelectPressed = false;
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _onPressSelectParty(animalName, party) {
    if (this.isSelectPressed) {
      return;
    }

    this.isSelectPressed = true;
    animalName.swing(1000);

    this.props.editParty(this.props.client.authToken, this.props.client.firebaseUserObj, party)
      .then(() => {
        if (this.props.isLogin) {
          this.props.navigateTo('HomeScreen', { isLogin: true });
        } else {
          this.props.goBack();
        }
      })
      .catch((error) => {
        this.isSelectPressed = false;
        defaultErrorAlert(error);
      });
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderPartyView(animalName, partyName, partySubtitle, imagePath, backgroundColor) {
    return (
      <RN.TouchableWithoutFeedback onPress={() => this._onPressSelectParty(animalName, partyName)} >
        <RN.View style={[styles.partyView, {backgroundColor: backgroundColor}]}>
          <Animatable.Image
            ref={(ref) => animalName = ref}
            style={styles.animal}
            source={imagePath}
            resizeMode={'contain'}
            />
          <RN.Text allowFontScaling={false} style={styles.titleText}>
            {partyName}
          </RN.Text>
          <RN.Text allowFontScaling={false} style={styles.subtitleText}>
            {partySubtitle}
          </RN.Text>
        </RN.View>
      </RN.TouchableWithoutFeedback>
    )
  }

  _renderChoosePartyView() {
    return (
      <RN.View style={styles.choosePartyView}>
        <RN.View style={styles.horizontalLine} />
          <RN.Text allowFontScaling={false} style={styles.choosePartyText}>
            {'Choose Party'}
          </RN.Text>
        <RN.View style={styles.horizontalLine} />
      </RN.View>
    )
  }

  _renderHeader() {
    if (!this.props.isLogin) {
      return (
        <HeaderContainer
          backIcon={true}
          backTitle={'Choose Party'}
          />
      )
    } else {
      return null;
    }
  }

  render() {
    return (
      <RN.View style={UTILITY_STYLES.containerStart}>
        {this._renderHeader()}
        {this._renderPartyView(this.elephant, 'REPUBLICAN', '(Conservative)', require('../../assets/images/animals/republican.png'), COLORS.appleRed)}
        {this._renderChoosePartyView()}
        {this._renderPartyView(this.donkey, 'DEMOCRAT', '(Liberal)', require('../../assets/images/animals/democrat.png'), COLORS.appleBlue)}
      </RN.View>
    )
  }
}


// --------------------------------------------------------------------


export default ChoosePartyScreen;
