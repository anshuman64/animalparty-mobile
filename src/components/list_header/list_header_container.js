// Library Imports
import { connect } from 'react-redux';

// Local Imports
import ListHeader from './list_header';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache }, ownProps) => ({
  client:     client,
  usersCache: usersCache,
});

export default connect(
  mapStateToProps,
)(ListHeader);
