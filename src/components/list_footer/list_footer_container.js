// Library Imports
import { connect } from 'react-redux';

// Local Imports
import ListFooter from './list_footer';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache }, ownProps) => ({
  client:     client,
  usersCache: usersCache,
});

export default connect(
  mapStateToProps,
)(ListFooter);
