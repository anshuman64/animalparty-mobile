// Library Imports
import { connect } from 'react-redux';

// Local Imports
import ChoosePartyScreen from './choose_party_screen';
import { editParty }     from '../../actions/client_actions';
import { navigateTo, goBack }    from '../../actions/navigation_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client }, ownProps) => ({
  client:        client,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  editParty:   (authToken, firebaseUserObj, party) => dispatch(editParty(authToken, firebaseUserObj, party)),
  navigateTo:  (screen, props)                     => dispatch(navigateTo(screen, props)),
  goBack:      (props)                             => dispatch(goBack(props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChoosePartyScreen);
