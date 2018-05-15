// Library Imports
import { connect } from 'react-redux';

// Local Imports
import HomeScreen             from './home_screen';
import { requestConnection }  from '../../actions/connection_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, connections, usersCache }, ownProps) => ({
  client:      client,
  connections: connections.connections,
  usersCache:  usersCache,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  requestConnection: (authToken, firebaseUserObj, clientId) => dispatch(requestConnection(authToken, firebaseUserObj, clientId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
