// Library Imports
import React  from 'react';
import RN     from 'react-native';
import _      from 'lodash';
import Icon   from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import { styles }                 from './section_list_header_styles';
import { UTILITY_STYLES, COLORS } from '../../utilities/style_utility';

//--------------------------------------------------------------------//

/*
Required Passed Props:
  title (string): title to display
Optional Passed Props:
  TODO
*/
class SectionListHeader extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    return(
      <RN.TouchableOpacity onPress={this.props.callback} disabled={!this.props.callback}>
        <RN.View style={styles.sectionHeader}>
          <RN.Text allowFontScaling={false} style={styles.sectionHeaderText}>
            {this.props.title}
          </RN.Text>
        </RN.View>
      </RN.TouchableOpacity>
    )
  }
}


//--------------------------------------------------------------------//


export default SectionListHeader;
