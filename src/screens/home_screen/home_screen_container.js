// Library Imports
import { connect } from 'react-redux';

// Local Imports
import HomeScreen  from './home_screen';
import { navigateTo } from '../../actions/navigation_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, connections, usersCache }, ownProps) => ({
  client:      client,
  connections: connections.connections,
  usersCache:  usersCache,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  navigateTo: (screen, props) => dispatch(navigateTo(screen, props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);