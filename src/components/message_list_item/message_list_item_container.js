// Library Imports
import { connect } from 'react-redux';

// Local Imports
import MessageListItem from './message_list_item';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache, mediaCache, messages }, ownProps) => ({
  client:      client,
  usersCache:  usersCache,
  mediaCache: mediaCache,
  messages:    messages,
});

export default connect(
  mapStateToProps
)(MessageListItem);
