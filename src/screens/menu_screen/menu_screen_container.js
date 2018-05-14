// Library Imports
import { connect } from 'react-redux';

// Local Imports
import MenuScreen from './menu_screen';
import { navigateTo }    from '../../actions/navigation_actions';

//--------------------------------------------------------------------

const mapDispatchToProps = (dispatch, ownProps) => ({
  navigateTo:  (screen, props)                     => dispatch(navigateTo(screen, props)),
});

export default connect(
  null,
  mapDispatchToProps
)(MenuScreen);
