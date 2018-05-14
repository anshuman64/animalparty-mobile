// Library Imports
import { connect } from 'react-redux';

// Local Imports
import MenuListItem from './menu_list_item';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache }, ownProps) => ({
  client:     client,
  usersCache: usersCache,
});

export default connect(
  mapStateToProps,
)(MenuListItem);
