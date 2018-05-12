// Library Imports
import React           from 'react';
import RN              from 'react-native';
import * as Animatable from 'react-native-animatable';
import Hyperlink       from 'react-native-hyperlink';

// Local Imports
import MediumContainer          from '../medium/medium_container';
import { styles }               from './message_list_item_styles';
import * as StyleUtility        from '../../utilities/style_utility';
import { renderMessageDate }    from '../../utilities/date_time_utility';
import { setStateCallback }     from '../../utilities/function_utility';

//--------------------------------------------------------------------//

/*
Required Passed Props:
  index (int): index of message in conversation to get next or last message
  message (object): message object to render
  convoId (int): userId or groupId of conversation
Optional Passed Props:
  -
*/
class MessageListItem extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      isDateShown:    false,
      isModalVisible: false,
    };
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  // If the last message was sent more than 20 mins ago, render date header
  _renderDateHeader() {
    let isHeader = false;
    let thisMessageCreatedAt = new Date(this.props.message.created_at);

    // Show date if:
    // 1) the message is the first message in the conversation
    // 2) the last message was sent more than 10 mins ago
    if (this.props.index === this.props.messages[this.props.convoId].data.length - 1) {
      isHeader = true;
    } else {
      let lastMessage = this.props.messages[this.props.convoId].data[this.props.index + 1];

      if (lastMessage) {
        let lastMessageCreatedAt = new Date(lastMessage.created_at);

        if (thisMessageCreatedAt - lastMessageCreatedAt > 600000) {
          isHeader = true;
        }
      }
    }

    if (isHeader) {
      return (
        <RN.View style={styles.dateHeader}>
          <RN.Text allowFontScaling={false} style={styles.dateHeaderText}>
            {renderMessageDate(thisMessageCreatedAt)}
          </RN.Text>
        </RN.View>
      )
    } else {
      return null;
    }
  }

  _renderAvatar() {
    let isAvatar = false;

    // Show avatar on other user's message if:
    // 1) the message is the newest message
    // 2) the next message is by someone else
    // 3) the next message was sent more than 10 mins later
    if (this.props.message.author_id === this.props.client.id) {
      isAvatar = false;
    } else if (this.props.index === 0) {
      isAvatar = true;
    } else {
      let thisMessage = this.props.message;
      let nextMessage = this.props.messages[this.props.convoId].data[this.props.index - 1];
      let thisMessageCreatedAt = new Date(thisMessage.created_at);
      let nextMessageCreatedAt = new Date(nextMessage.created_at);

      if (thisMessage.author_id != nextMessage.author_id
          || nextMessageCreatedAt - thisMessageCreatedAt > 600000) {
        isAvatar = true;
      }
    }

    if (isAvatar) { // TODO
      return null;
    } else if (this.props.message.author_id != this.props.client.id) {
      return (
        <RN.View style={{width: 30, height: 30}} />
      )
    } else {
      return null;
    }
  }

  _renderBody(isAuthoredByClient) {
    if (this.props.message.body) {
      let bodyStyle = isAuthoredByClient ? styles.bodyTextClient : styles.bodyTextUser;

      return (
        <Hyperlink linkDefault={true} linkStyle={{color: StyleUtility.COLORS.grey900}}>
          <RN.Text allowFontScaling={false} style={bodyStyle}>
            {this.props.message.body}
          </RN.Text>
        </Hyperlink>
      )
    } else {
      return null;
    }
  }

  _renderMedium(isAuthoredByClient) {
    return null; // TODO
    let medium = this.props.message.medium;
    let width = StyleUtility.getUsableDimensions().width * 0.75;
    let height = StyleUtility.getScaledHeight(medium, width);

    return (
      <MediumContainer medium={this.props.message.medium} containerStyle={styles.mediumContainer} mediumStyle={{ width: width - 15, height: height - 15, borderRadius: 10 }} />
    )
  }

  _renderDate(isAuthoredByClient) {
    if (this.state.isDateShown) {
      return (
        <RN.Text allowFontScaling={false} style={[styles.date, isAuthoredByClient && {alignSelf: 'flex-end'}]}>
          {renderMessageDate(this.props.message.created_at)}
        </RN.Text>
      )
    } else {
      return null;
    }
  }

  _renderMessage() {
    let isAuthoredByClient = this.props.message.author_id === this.props.client.id;
    let isBackgroundColor  = this.props.message.body;
    let isFirstMessage = this.props.index === 0;
    let containerStyle = isAuthoredByClient ? styles.messageContainerClient : styles.messageContainerUser;
    let messageStyle = isAuthoredByClient ? styles.messageViewClient : styles.messageViewUser;

    return (
      <RN.View style={[containerStyle, isFirstMessage && {marginBottom: 15}]}>
        {this._renderAvatar()}
        <RN.TouchableOpacity
          activeOpacity={0.5}
          onPress={setStateCallback(this, { isDateShown: !this.state.isDateShown})}
          >
          <RN.View style={[messageStyle, !isBackgroundColor && {backgroundColor: 'transparent'}]}>
            {this._renderPost(isAuthoredByClient)}
            {this._renderBody(isAuthoredByClient)}
            {this._renderMedium(isAuthoredByClient)}
          </RN.View>
          {this._renderDate(isAuthoredByClient)}
        </RN.TouchableOpacity>
      </RN.View>
    )
  }


  render() {
    return (
      <RN.View>
        {this._renderDateHeader()}
        {this._renderMessage()}
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default MessageListItem;
