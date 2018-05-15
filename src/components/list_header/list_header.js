// Library Imports
import React  from 'react';
import RN     from 'react-native';
import Icon   from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import { styles }                            from './list_header_styles';
import { UTILITY_STYLES, getHighlightColor } from '../../utilities/style_utility';

//--------------------------------------------------------------------//

/*
Required Passed Props:
  text (string): text to display
  iconName (string): name of icon from SimpleLineIcons directory
  callback (func): callback when pressed
Optional Passed Props:
  -
*/
class ListHeader extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    let client = this.props.usersCache[this.props.client.id];

    return(
      <RN.TouchableOpacity onPress={this.props.callback}>
        <RN.View style={styles.headerItemView}>
          <Icon name={this.props.iconName} style={[styles.headerItemIcon, getHighlightColor(client)]} />
          <RN.Text allowFontScaling={false} style={[UTILITY_STYLES.lightBlackText16, getHighlightColor(client)]}>
            {this.props.text}
          </RN.Text>
        </RN.View>
      </RN.TouchableOpacity>
    )
  }
}


//--------------------------------------------------------------------//


export default ListHeader;
