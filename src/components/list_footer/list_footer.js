// Library Imports
import React from 'react';
import RN    from 'react-native';

// Local Imports
import { styles }        from './list_footer_styles';
import * as StyleUtility from '../../utilities/style_utility';

//--------------------------------------------------------------------//

/*
Required Passed Props:
  footerWidth (int): how wide the screen is
  text (string): black text to put
Optional Passed Props:
  highlightedText (string): blue text to put
  callback (func): callback when footer is pressed
*/
class ListFooter extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    let lineWidth = (StyleUtility.getUsableDimensions().width - this.props.footerWidth) / 2 - 20;
    let client = this.props.usersCache[this.props.client.id];

    return (
      <RN.TouchableWithoutFeedback onPress={this.props.callback} disabled={!this.props.callback}>
        <RN.View style={styles.footerView}>
          <RN.View style={[styles.horizontalLine, {width: lineWidth}]} />
          <RN.Text allowFontScaling={false} style={styles.footerText}>
            {this.props.text}
          </RN.Text>
          <RN.Text allowFontScaling={false} style={[styles.footerText, StyleUtility.getHighlightColor(client)]}>
            {this.props.highlightedText}
          </RN.Text>
          <RN.View style={[styles.horizontalLine, {width: lineWidth}]} />
        </RN.View>
      </RN.TouchableWithoutFeedback>
    )
  }
}

//--------------------------------------------------------------------//

export default ListFooter;
