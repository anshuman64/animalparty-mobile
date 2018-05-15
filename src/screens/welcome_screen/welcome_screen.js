// Library Imports
import React           from 'react';
import RN              from 'react-native';
import * as Animatable from 'react-native-animatable';

// Local Imports
import * as Styles from './welcome_screen_styles';
import { UTILITY_STYLES }                                   from '../../utilities/style_utility';
import { setStateCallback }                                 from '../../utilities/function_utility';

//--------------------------------------------------------------------//

/*
Required Screen Props:

Optional Screen Props:

*/
class WelcomeScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      isLogoIn:  false,
      isChecked: false,
    };
  }

  //--------------------------------------------------------------------//
  // Animation Render Methods
  //--------------------------------------------------------------------//

  _renderAnimalAnimation() {
    if (!this.state.isLogoIn) {
      return (
        <Animatable.Image
          style={Styles.styles.logo}
          source={require('../../assets/images/logo_animal/logo_animal.png')}
          resizeMode={'contain'}
          animation={Styles.bounceInLeft}
          duration={2000}
          delay={500}
          />
      )
    } else {
      return (
        <Animatable.Image
          style={Styles.styles.logo}
          source={require('../../assets/images/logo_animal/logo_animal.png')}
          resizeMode={'contain'}
          animation={Styles.translateAnimalLogo}
          duration={2000}
          delay={500}
          />
      )
    }
  }

  _renderPartyAnimation() {
    if (!this.state.isLogoIn) {
      return (
        <Animatable.Image
          style={Styles.styles.logo}
          source={require('../../assets/images/logo_party/logo_party.png')}
          resizeMode={'contain'}
          animation={Styles.bounceInDown}
          duration={2000}
          delay={1250}
          />
      )
    } else {
      return (
        <Animatable.Image
          style={Styles.styles.logo}
          source={require('../../assets/images/logo_party/logo_party.png')}
          resizeMode={'contain'}
          animation={Styles.translatePartyLogo}
          duration={2000}
          />
      )
    }
  }

  _renderIconAnimation() {
    if (!this.state.isLogoIn) {
      return (
        <Animatable.Image
          style={Styles.styles.icon}
          source={require('../../assets/images/icon/icon.png')}
          resizeMode={'contain'}
          animation={Styles.fadeIn}
          easing={'ease-in'}
          duration={1250}
          delay={3000}
          onAnimationEnd={setStateCallback(this, { isLogoIn: true })}
          />
      )
    } else {
      return (
        <Animatable.Image
          style={Styles.styles.icon}
          source={require('../../assets/images/icon/icon.png')}
          resizeMode={'contain'}
          animation={Styles.translateIcon}
          duration={2000}
          />
      )
    }
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderFilledCheckbox() {
    if (this.state.isChecked) {
      return (
        <Animatable.View
          style={Styles.styles.checkboxFilled}
          animation={'zoomIn'}
          duration={50}
          />
      )
    } else {
      return null;
    }
  }

  _renderCheckbox() {
    return (
      <RN.View style={Styles.styles.checkboxView}>
        <RN.TouchableWithoutFeedback
          onPressIn={() => this.checkbox.setNativeProps({style: Styles.styles.checkboxHighlighted})}
          onPressOut={() => this.checkbox.setNativeProps({style: Styles.styles.checkbox})}
          onPress={setStateCallback(this, { isChecked: !this.state.isChecked })}
          >
          <RN.View ref={(ref) => this.checkbox = ref} style={Styles.styles.checkbox}>
            {this._renderFilledCheckbox()}
          </RN.View>
        </RN.TouchableWithoutFeedback>
        <RN.Text allowFontScaling={false} style={Styles.styles.checkboxText}>
          I agree to the
            <RN.Text allowFontScaling={false} style={UTILITY_STYLES.textHighlighted} onPress={() => RN.Linking.openURL('https://medium.com/@InsiyaInc/terms-of-use-4b1c31695dfe')}> Terms of Use</RN.Text>
          ,
            <RN.Text allowFontScaling={false} style={UTILITY_STYLES.textHighlighted} onPress={() => RN.Linking.openURL('https://medium.com/@InsiyaInc/privacy-policy-febc9c4cb192')}> Privacy Policy</RN.Text>
          , and
            <RN.Text allowFontScaling={false} style={UTILITY_STYLES.textHighlighted} onPress={() => RN.Linking.openURL('https://medium.com/@InsiyaInc/community-guidelines-b9ee2fe3daf4')}> Community Guidelines</RN.Text>
        </RN.Text>
      </RN.View>
    )
  }

  _renderNextButton() {
    return (
      <RN.TouchableOpacity
        style={[UTILITY_STYLES.nextButtonBackground, {marginTop: 30}, !this.state.isChecked && UTILITY_STYLES.nextButtonBackgroundDisabled]}
        onPress={() => this.props.navigateTo('LoginScreen')}
        disabled={!this.state.isChecked}
        >
        <RN.Text allowFontScaling={false} style={[UTILITY_STYLES.lightWhiteText18, !this.state.isChecked && UTILITY_STYLES.nextButtonTextDisabled]}>
          {'Next'}
        </RN.Text>
      </RN.TouchableOpacity>
    )
  }

  _renderWelcomeScreen() {
    if (this.state.isLogoIn) {
      return (
        <Animatable.View
          style={Styles.styles.animatableView}
          animation={'fadeIn'}
          duration={2000}
          delay={600}
          >
          {this._renderCheckbox()}
          {this._renderNextButton()}
        </Animatable.View>
      )
    }
  }

  render() {
    return (
      <RN.View style={UTILITY_STYLES.containerCenter}>
        {this._renderAnimalAnimation()}
        {this._renderPartyAnimation()}
        {this._renderIconAnimation()}
        {this._renderWelcomeScreen()}
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default WelcomeScreen;
