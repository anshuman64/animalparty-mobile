// Library Imports
import { connect } from 'react-redux';

// Local Imports
import HomeScreen  from './home_screen';
import { navigateTo } from '../../actions/navigation_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache }, ownProps) => ({
  client:        client,
  usersCache:    usersCache,
  // blocks:        blocks,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  navigateTo: (screen, props) => dispatch(navigateTo(screen, props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
