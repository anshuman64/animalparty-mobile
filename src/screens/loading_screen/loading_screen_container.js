// Library Imports
import { connect } from 'react-redux';

// Local Imports
import LoadingScreen                              from './loading_screen';
import { loginClient }                            from '../../actions/client_actions';
import { navigateTo }                             from '../../actions/navigation_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, navigation }, ownProps) => ({
  client:        client,
  currentScreen: navigation.currentScreen
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  navigateTo:              (screen, props)                                                                  => dispatch(navigateTo(screen, props)),
  loginClient:             (firebaseUserObj)                                                                => dispatch(loginClient(firebaseUserObj)),
});

export default connect(
  null,
  mapDispatchToProps
)(LoadingScreen);
