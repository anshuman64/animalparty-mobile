// Library Imports
import { connect } from 'react-redux';

// Local Imports
import Header                 from './header';
import { requestConnection, deleteConnection }  from '../../actions/connection_actions';
import { navigateTo, goBack } from '../../actions/navigation_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache }, ownProps) => ({
  client:     client,
  usersCache: usersCache,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  requestConnection: (authToken, firebaseUserObj)         => dispatch(requestConnection(authToken, firebaseUserObj)),
  deleteConnection:  (authToken, firebaseUserObj, userId) => dispatch(deleteConnection(authToken, firebaseUserObj, userId)),
  navigateTo:        (screen, props)                      => dispatch(navigateTo(screen, props)),
  goBack:            (props)                              => dispatch(goBack(props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
