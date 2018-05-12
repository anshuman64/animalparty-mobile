// Library Imports
import React from 'react';
import RN    from 'react-native';

// Local Imports
// import EntityInfoView              from '../entity_info_view/entity_info_view_container';
// import AvatarContainer             from '../avatar/avatar_container';
import { styles }                  from './connection_list_item_styles';
import { UTILITY_STYLES }          from '../../utilities/style_utility';
// import { renderConversationDate }  from '../../utilities/date_time_utility';
// import * as EntityUtility          from '../../utilities/entity_utility';

//--------------------------------------------------------------------//

/*
Required Passed Props:
  convoId (int): id of the user or group of the conversation
Optional Passed Props:
  -
*/
class ConnectionListItem extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  // _renderDate() {
  //   let convo = EntityUtility.getEntity(this.props.convoId, this.props.usersCache, this.props.groupsCache);
  //   let createdAtDate = convo && convo.peek_message ? convo.peek_message.created_at : convo.created_at;
  //   let dateText = createdAtDate ? renderConversationDate(createdAtDate) : '';
  //
  //   return (
  //     <RN.Text allowFontScaling={false} style={styles.dateText}>
  //       {dateText}
  //     </RN.Text>
  //   )
  // }
  //
  // _renderUsernameView() {
  //   let convo = EntityUtility.getEntity(this.props.convoId, this.props.usersCache, this.props.groupsCache);
  //   let message = convo ? convo.peek_message : null;
  //   let messagePreview = EntityUtility.getMessagePreview(message, this.props.client.id, this.props.usersCache, this.props.postsCache);
  //
  //   return (
  //     <EntityInfoView entityId={this.props.convoId} messagePreview={messagePreview} disableUsername={true} marginLeft={7} subtractWidth={170} />
  //   )
  // }

  render() {
    return (
      <RN.TouchableOpacity onPress={() => this.props.navigateTo('MessagesScreen', { userId: this.props.userId })}>
        <RN.View style={UTILITY_STYLES.rowView}>
        </RN.View>
      </RN.TouchableOpacity>
    )
  }
}


//--------------------------------------------------------------------//

export default ConnectionListItem;
