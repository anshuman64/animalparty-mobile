// Library Imports
import React from 'react';
import RN    from 'react-native';

// Local Imports
import { styles }         from './choose_party_screen_styles';
import { UTILITY_STYLES } from '../../utilities/style_utility';

//--------------------------------------------------------------------//

/*
Required Screen Props:
  -
Optional Screen Props:
  -
*/
class ChoosePartyScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      isLoading:     false,
    };

    this.isSelectPressed = false;
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _onPressSelectParty(party) {
    if (this.isSelectPressed) {
      return;
    }

    this.isSelectPressed = true;

    this.setState({ isLoading: true } , () => {
      this.props.editParty(this.props.client.authToken, this.props.client.firebaseUserObj, party)
        .then(() => {
          this.props.navigateTo('HomeScreen');
        })
        .catch((error) => {
          defaultErrorAlert(error);
        })
        .finally(() => {
          this.isSelectPressed = false;
        });
    });
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    return (
      <RN.View style={styles.container}>
        <RN.TouchableWithoutFeedback onPress={() => this._onPressSelectParty('DEMOCRAT')} >
          <RN.View style={styles.blueView} />
        </RN.TouchableWithoutFeedback>
        <RN.TouchableWithoutFeedback onPress={() => this._onPressSelectParty('REPUBLICAN')} >
          <RN.View style={styles.redView} />
        </RN.TouchableWithoutFeedback>
      </RN.View>
    )
  }
}


// --------------------------------------------------------------------


export default ChoosePartyScreen;
