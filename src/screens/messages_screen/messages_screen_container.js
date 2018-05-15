// Library Imports
import { connect } from 'react-redux';

// Local Imports
import MessagesScreen                 from './messages_screen';
import { getMessages, createMessage } from '../../actions/message_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache, messages }, ownProps) => ({
  client:        client,
  usersCache:    usersCache,
  messages:      messages
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getMessages:   (authToken, firebaseUserObj, isNew, userId, queryParams)                                                => dispatch(getMessages(authToken, firebaseUserObj, isNew, userId, queryParams)),
  createMessage: (authToken, firebaseUserObj, clientId, userId, messageBody, messageMedium) => dispatch(createMessage(authToken, firebaseUserObj, clientId, userId, messageBody, messageMedium)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessagesScreen);
