// Library Imports
import React from 'react';
import RN    from 'react-native';
import Icon  from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility';

//--------------------------------------------------------------------//

/*
Required Passed Props:
  userId (int): userId of user to fetch avatar_medium_id
  avatarSize (int): how big the avatar frame should be
  frameBorderWidth (int): how thick the frame should be
  iconSize (int): how big the person icon should be
Optional Passed Props:
  avatarUrl (string): passed from AvatarScreen to render pending avatar
*/
class Avatar extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    return (
      <RN.View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: this.props.avatarSize,
        width: this.props.avatarSize,
      }}
      >
        <RN.View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: this.props.avatarSize - 4,
          width: this.props.avatarSize - 4,
          borderWidth: this.props.frameBorderWidth,
          borderColor: StyleUtility.COLORS.grey800,
          borderRadius: (this.props.avatarSize - 4) / 2,
        }}>
          <Icon name='user' style={{
            fontSize: this.props.iconSize,
            textAlign: 'center',
            color: StyleUtility.COLORS.grey900,
          }}
          />
        </RN.View>
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default Avatar;
