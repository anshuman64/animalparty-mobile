// Library Imports
import React from 'react';
import RN    from 'react-native';

// Local Imports
import { styles }                  from './connection_list_item_styles';
import { UTILITY_STYLES, getUsableDimensions }          from '../../utilities/style_utility';
import * as AnimalUtility       from '../../utilities/animal_utility';
import { renderConversationDate }  from '../../utilities/date_time_utility';

//--------------------------------------------------------------------//

/*
Required Passed Props:
  userId (int): id of the user or group of the conversation
Optional Passed Props:
  -
*/
class ConnectionListItem extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderDate() {
    let user = this.props.usersCache[this.props.userId];
    let createdAtDate = user && user.peek_message ? user.peek_message.created_at : null;
    let dateText = createdAtDate ? renderConversationDate(createdAtDate) : null;

    if (createdAtDate) {
      return (
        <RN.Text allowFontScaling={false} style={styles.dateText}>
          {dateText}
        </RN.Text>
      )
    } else {
      return null;
    }
  }

  _renderUsernameView() {
    let user = this.props.usersCache[this.props.userId];
    let username = AnimalUtility.getUsername(user);
    let avatar = AnimalUtility.getAvatar(user);
    let message = user ? user.peek_message : null;
    let messagePreview = AnimalUtility.getMessagePreview(message, this.props.client.id);
    let maxWidth = getUsableDimensions().width - 170;

    return (
      <RN.View style={styles.userView}>
        <RN.Image
          style={styles.avatar}
          source={avatar}
          resizeMode={'cover'}
          />
        <RN.View style={styles.usernameView}>
          <RN.Text allowFontScaling={false} ref={(ref) => this.usernameText = ref} style={[UTILITY_STYLES.regularBlackText16, {maxWidth: maxWidth}]} numberOfLines={1}>
            {username}
          </RN.Text>
          <RN.Text allowFontScaling={false} style={[styles.messageText, {maxWidth: maxWidth}]} numberOfLines={1}>
            {messagePreview}
          </RN.Text>
        </RN.View>
      </RN.View>
    )
  }

  render() {
    return (
      <RN.TouchableOpacity onPress={() => this.props.navigateTo('MessagesScreen', { userId: this.props.userId })}>
        <RN.View style={UTILITY_STYLES.rowView}>
          {this._renderUsernameView()}
          {this._renderDate()}
        </RN.View>
      </RN.TouchableOpacity>
    )
  }
}


//--------------------------------------------------------------------//

export default ConnectionListItem;
