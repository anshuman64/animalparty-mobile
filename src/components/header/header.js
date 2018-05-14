// Library Imports
import React       from 'react';
import RN          from 'react-native';
import Icon        from 'react-native-vector-icons/SimpleLineIcons';
import Ionicon     from 'react-native-vector-icons/Ionicons';

// Local Imports
import LoadingModal                            from '../loading_modal/loading_modal.js'
import { styles }                              from './header_styles';
import { UTILITY_STYLES, getUsableDimensions } from '../../utilities/style_utility';
import { defaultErrorAlert }                   from '../../utilities/error_utility';

//--------------------------------------------------------------------//

/*
Required Passed Props:
  -
Optional Passed Props:
  TODO
*/
class Header extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    }

    this.isNextPressed   = false;
    this.isButtonPressed = false;
    this.isGoBackPressed = false;
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  // Goes back one screen
  _goBack = () => {
    if (this.isGoBackPressed) {
      return;
    }

    this.isGoBackPressed = true;
    this.props.goBack();
  }

  _onPressSettings = () => {
    this.props.navigateTo('MenuScreen');
  }

  _onPressAdd = () => {
    if (this.isButtonPressed) {
      return;
    }

    this.isButtonPressed = true;

    this.setState({ isLoading: true } , () => {
      this.props.requestConnection(this.props.client.authToken, this.props.client.firebaseUserObj)
        .catch((error) => {
          defaultErrorAlert(error);
        })
        .finally(() => {
          this.isButtonPressed = false;
          this.setState({ isLoading: false });
        });
    });
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderBlank() {
    if (this.props.blank) {
      return (
        <RN.View />
      )
    }
  }

  _renderBackIcon() {
    if (this.props.backIcon) {
      return (
        <RN.View style={styles.backView}>
          <RN.TouchableWithoutFeedback
            onPressIn={() => this.backIcon.setNativeProps({style: UTILITY_STYLES.textHighlighted})}
            onPressOut={() => this.backIcon.setNativeProps({style: styles.backIcon})}
            onPress={this._goBack}
            >
            <RN.View style={styles.button}>
              <Ionicon
                ref={(ref) => this.backIcon = ref}
                name='ios-arrow-round-back'
                style={styles.backIcon}
                />
            </RN.View>
          </RN.TouchableWithoutFeedback>
          {this._renderBackTitle()}
        </RN.View>
      )
    }
  }

  _renderBackTitle() {
    if (this.props.backTitle) {
      return (
        <RN.Text allowFontScaling={false} numberOfLines={1} style={[UTILITY_STYLES.regularBlackText18, {maxWidth: getUsableDimensions().width - 140}, !this.props.backIcon && {marginLeft: 50}]}>
          {this.props.backTitle}
        </RN.Text>
      )
    }
  }

  _renderSettingsIcon() {
    if (this.props.settingsIcon) {
      return (
        <RN.TouchableWithoutFeedback
          onPressIn={() => this.settingsIcon.setNativeProps({style: UTILITY_STYLES.textHighlighted})}
          onPressOut={() => this.settingsIcon.setNativeProps({style: styles.settingsIcon})}
          onPress={this._onPressSettings}
          >
          <RN.View style={styles.button}>
            <Icon ref={(ref) => this.settingsIcon = ref} name='options-vertical' style={styles.settingsIcon} />
          </RN.View>
        </RN.TouchableWithoutFeedback>
      )
    }
  }

  _renderLogo() {
    if (this.props.logo) {
      return (
        <RN.Image
          style={styles.logo}
          source={require('../../assets/images/logo/logo.png')}
          resizeMode='contain'
          />
      )
    }
  }

  _renderCustomIcon() {
    if (this.props.customIcon) {
      return (
        <RN.TouchableWithoutFeedback
          onPressIn={() => this.customIcon.setNativeProps({style: UTILITY_STYLES.textHighlighted})}
          onPressOut={() => this.customIcon.setNativeProps({style: styles.customIcon})}
          onPress={this._onPressAdd}
          >
          <RN.View style={styles.button}>
            <Icon ref={(ref) => this.customIcon = ref} name='plus' style={styles.settingsIcon} />
          </RN.View>
        </RN.TouchableWithoutFeedback>
      )
    }
  }

  _renderLoadingModal() {
    return (
      <LoadingModal isLoading={this.state.isLoading}/>
    )
  }

  render() {
    return (
      <RN.View style={[styles.header, !this.props.noBorder && styles.border]}>
        {this._renderBlank()}
        {(this.props.backTitle && !this.props.backIcon) ? this._renderBackTitle() : this._renderBackIcon()}
        {this._renderSettingsIcon()}
        {this._renderLogo()}
        {this._renderCustomIcon()}
        {this._renderLoadingModal()}
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default Header;
