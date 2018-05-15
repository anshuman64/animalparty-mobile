// Library Imports
import { connect } from 'react-redux';

// Local Imports
import ConnectionListItem  from './connection_list_item';
import { navigateTo }      from '../../actions/navigation_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache }, ownProps) => ({
  client:      client,
  usersCache:  usersCache,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  navigateTo: (screen, props) => dispatch(navigateTo(screen, props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectionListItem);
