// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import { styles }        from './list_modal_styles';
import * as StyleUtility from '../../utilities/style_utility';
import { COUNTRY_CODES } from '../../utilities/country_utility';

//--------------------------------------------------------------------//

/*
Required Passed Props:
  isModalVisible (bool): determines if modal should be visible
  setParentState (func): used on CancelButton to close modal
Optional Passed Props:
  countryIndex (int): index of selected country in country_utility to determine scroll position
  setCountry (func): changes LoginScreen state with new country and country code. Used as proxy for login screen
*/
class ListModal extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      isModalMounted: false,
    };
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  // Renders the RN.ScrollView after other modal contents are mounted for performance
  componentDidMount() {
    setTimeout(() => this.setState({ isModalMounted: true }), 10);
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  // Scrolls directly to the currently selected country when RN.ScrollView is opened
  _onListViewContentSizeChange = () => {
    let height = 0.85 * StyleUtility.getUsableDimensions().height;
    let countryPosition = this.props.countryIndex * 45 - 2; // countryIndex * height of each bar minus aesthetic two pixels
    let maxPosition = COUNTRY_CODES.length * 45 - (height - 50 - 45); // length of full list minus length of one page of scrollView
    this.scrollView.scrollTo({x: 0, y: Math.min(countryPosition, maxPosition), animated: true})
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderTitle() {
    return (
      <RN.View style={styles.titleView}>
        <RN.Text allowFontScaling={false} style={StyleUtility.UTILITY_STYLES.regularBlackText16}>
          {'Select Country'}
        </RN.Text>
      </RN.View>
    )
  }

  _renderCountryList() {
    if(this.state.isModalMounted) {
      return (
        <RN.ScrollView
          ref={(ref) => this.scrollView = ref}
          style={styles.listView}
          onContentSizeChange={this._onListViewContentSizeChange}
          >
          {this._renderCountryListItem()}
        </RN.ScrollView>
      )
    } else {
      return (
        <RN.ActivityIndicator size='small' color={StyleUtility.COLORS.grey400}  />
      )
    }
  }

  _renderCountryListItem() {
    let rows = [];

    for (i = 0; i < COUNTRY_CODES.length; i++) {
      rows.push(
        <RN.TouchableWithoutFeedback
          onPressIn={() => {
            this.countryText.setNativeProps({style: StyleUtility.UTILITY_STYLES.textHighlighted})
            this.dialingCodeText.setNativeProps({style: StyleUtility.UTILITY_STYLES.textHighlighted})
          }}
          onPressOut={() => {
            this.countryText.setNativeProps({style: StyleUtility.UTILITY_STYLES.lightBlackText15})
            this.dialingCodeText.setNativeProps({style: StyleUtility.UTILITY_STYLES.lightBlackText15})
          }}
          onPress={this.props.setCountry(i)}
          key={i}
          >
          <RN.View style={styles.rowContainer}>
            <RN.Text
              allowFontScaling={false}
              ref={(ref) => this.countryText = ref}
              style={StyleUtility.UTILITY_STYLES.lightBlackText15}
              numberOfLines={1}
              ellipsizeMode={'tail'}>
              {COUNTRY_CODES[i].country_name}
            </RN.Text>
            <RN.Text allowFontScaling={false} ref={(ref) => this.dialingCodeText = ref} style={StyleUtility.UTILITY_STYLES.lightBlackText15}>
              {COUNTRY_CODES[i].dialing_code}
            </RN.Text>
          </RN.View>
        </RN.TouchableWithoutFeedback>
      )
    }

    return rows;
  }

  _renderCancelButton() {
    return (
      <RN.TouchableWithoutFeedback
        onPressIn={() => this.cancelButtonText.setNativeProps({style: StyleUtility.UTILITY_STYLES.textHighlighted})}
        onPressOut={() => this.cancelButtonText.setNativeProps({style: StyleUtility.UTILITY_STYLES.lightBlackText15})}
        onPress={() => this.props.setParentState({ isModalVisible: false })}
        >
        <RN.View style={styles.cancelButtonView}>
          <RN.Text allowFontScaling={false} ref={(ref) => this.cancelButtonText = ref} style={StyleUtility.UTILITY_STYLES.lightBlackText15}>
            {'Cancel'}
          </RN.Text>
        </RN.View>
      </RN.TouchableWithoutFeedback>
    )
  }

  render() {
    return(
      <RN.Modal
        visible={this.props.isModalVisible}
        onRequestClose={() => this.props.setParentState({ isModalVisible: false })}
        transparent={false}
        animationType={'none'}
        >
        <RN.View style={StyleUtility.UTILITY_STYLES.containerCenter}>
          <RN.View style={styles.container}>
            {this._renderTitle()}
            {this._renderCountryList()}
            {this._renderCancelButton()}
          </RN.View>
        </RN.View>
      </RN.Modal>
    )
  }
}


//--------------------------------------------------------------------//


export default ListModal;
