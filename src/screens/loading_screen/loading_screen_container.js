// Library Imports
import { connect } from 'react-redux';

// Local Imports
import LoadingScreen                              from './loading_screen';
import { loginClient }                            from '../../actions/client_actions';
import { navigateTo }                             from '../../actions/navigation_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache, navigation }, ownProps) => ({
  client:        client,
  usersCache:    usersCache,
  currentScreen: navigation.currentScreen
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  navigateTo:              (screen, props)                                                                  => dispatch(navigateTo(screen, props)),
  loginClient:             (firebaseUserObj)                                                                => dispatch(loginClient(firebaseUserObj)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoadingScreen);
