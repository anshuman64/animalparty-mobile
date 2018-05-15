// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import { styles } from './section_list_header_styles';

//--------------------------------------------------------------------//

/*
Required Passed Props:
  title (string): title to display
Optional Passed Props:
  callback (func): callback when header is pressed
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
