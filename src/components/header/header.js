// Library Imports
import React       from 'react';
import RN          from 'react-native';
import Icon        from 'react-native-vector-icons/Octicons';
import Ionicon     from 'react-native-vector-icons/Ionicons';

// Local Imports
import LoadingModal           from '../loading_modal/loading_modal.js';
import { styles }             from './header_styles';
import * as StyleUtility      from '../../utilities/style_utility';
import { getOppositeParty }   from '../../utilities/animal_utility';
import { defaultErrorAlert }  from '../../utilities/error_utility';

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

    this.isJoinQueuePressed = false;
    this.isLeavePressed = false;
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

  _onPressHelp = () => {
    let oppositeParty = getOppositeParty(this.props.usersCache[this.props.client.id]);
    RN.Alert.alert('', "We will notify you when you are matched with the next available " + oppositeParty + ".", [{text: 'OK', style: 'cancel'}]);
  }

  _onPressJoinQueue = () => {
    if (this.isJoinQueuePressed) {
      return;
    }

    this.isJoinQueuePressed = true;

    this.setState({ isLoading: true } , () => {
      this.props.requestConnection(this.props.client.authToken, this.props.client.firebaseUserObj, this.props.client.id)
        .catch((error) => {
          defaultErrorAlert(error);
        })
        .finally(() => {
          this.isJoinQueuePressed = false;
          this.setState({ isLoading: false });
        });
    });
  }

  _onPressLeave = () => {
    if (this.isLeavePressed) {
      return;
    }

    this.isLeavePressed = true;

    RN.Alert.alert('', 'Are you sure you want to leave this conversation?',
      [{text: 'Cancel', onPress: () => this.isLeavePressed = false, style: 'cancel'},
       {text: 'Leave', onPress: this._onConfirmLeave}],
       {onDismiss: () => this.isLeavePressed = false}
    );
  }

  _onConfirmLeave = () => {
    this.setState({ isLoading: true },() => {
      this.props.deleteConnection(this.props.client.authToken, this.props.client.firebaseUserObj, this.props.userId)
        .then(() => {
          this.props.goBack();
        })
        .catch((error) => {
          defaultErrorAlert(error);
        })
        .finally(() => {
          this.isLeavePressed = false;
          this.setState({ isLoading: false });
        });
    });
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderBackIcon() {
    if (this.props.backIcon) {
      return (
        <RN.View style={styles.backView}>
          <RN.TouchableWithoutFeedback
            onPressIn={() => this.backIcon.setNativeProps({style: StyleUtility.getHighlightColor(client)})}
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
        <RN.Text allowFontScaling={false} numberOfLines={1} style={[StyleUtility.UTILITY_STYLES.regularBlackText18, {maxWidth: StyleUtility.getUsableDimensions().width - 150}, !this.props.backIcon && {marginLeft: 50}]}>
          {this.props.backTitle}
        </RN.Text>
      )
    }
  }

  _renderSettingsIcon() {
    if (this.props.settingsIcon) {
      return (
        <RN.TouchableWithoutFeedback
          onPressIn={() => this.settingsIcon.setNativeProps({style: StyleUtility.getHighlightColor(client)})}
          onPressOut={() => this.settingsIcon.setNativeProps({style: styles.settingsIcon})}
          onPress={this._onPressSettings}
          >
          <RN.View style={styles.button}>
            <Icon ref={(ref) => this.settingsIcon = ref} name='kebab-vertical' style={styles.settingsIcon} />
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

  _renderCustomButton() {
    if (this.props.homeScreenButton || this.props.messagesScreenButton) {
      let client = this.props.usersCache[this.props.client.id];
      let text;
      let callback;

      if (this.props.homeScreenButton) {
        if (!client.queued_at) {
          text = 'New';
          callback = this._onPressJoinQueue;
        } else {
          text = 'Help';
          callback = this._onPressHelp;
        }
      } else if (this.props.messagesScreenButton) {
        text = 'Leave';
        callback = this._onPressLeave;
      }

      return (
        <RN.TouchableOpacity onPress={callback}>
          <RN.View style={styles.button}>
            <RN.Text allowFontScaling={false} style={[StyleUtility.UTILITY_STYLES.lightBlackText16, StyleUtility.getHighlightColor(client)]}>
              {text}
            </RN.Text>
          </RN.View>
        </RN.TouchableOpacity>
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
        {this._renderCustomButton()}
        {this._renderLoadingModal()}
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default Header;
