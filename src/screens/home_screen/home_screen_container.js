// Library Imports
import { connect } from 'react-redux';

// Local Imports
import HomeScreen  from './home_screen';
import { requestConnection }  from '../../actions/connection_actions';
import { navigateTo } from '../../actions/navigation_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, connections, usersCache }, ownProps) => ({
  client:      client,
  connections: connections.connections,
  usersCache:  usersCache,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  requestConnection: (authToken, firebaseUserObj, clientId) => dispatch(requestConnection(authToken, firebaseUserObj, clientId)),
  navigateTo: (screen, props) => dispatch(navigateTo(screen, props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
