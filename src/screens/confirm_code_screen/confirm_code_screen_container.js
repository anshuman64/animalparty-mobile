// Library Imports
import { connect } from 'react-redux';

// Local Imports
import ConfirmCodeScreen                               from './confirm_code_screen';
import { getConfirmationCode, verifyConfirmationCode } from '../../actions/client_actions';

//--------------------------------------------------------------------//

const mapDispatchToProps = (dispatch, ownProps) => ({
  getConfirmationCode:    (phoneNumber)                       => dispatch(getConfirmationCode(phoneNumber)),
  verifyConfirmationCode: (confirmationCodeObj, inputtedCode) => dispatch(verifyConfirmationCode(confirmationCodeObj, inputtedCode)),
});

export default connect(
  null,
  mapDispatchToProps
)(ConfirmCodeScreen);
