// Library Imports
import React from 'react';
import RN    from 'react-native';

// Local Imports
import LoadingModal                  from '../../components/loading_modal/loading_modal.js';
import ConnectionListItemContainer   from '../../components/connection_list_item/connection_list_item_container';
import SectionListHeader             from '../../components/section_list_header/section_list_header';
import ListHeaderContainer           from '../../components/list_header/list_header_container';
import ListFooterContainer           from '../../components/list_footer/list_footer_container';
import { UTILITY_STYLES, scaleFont } from '../../utilities/style_utility';
import { getRandomInt }              from '../../utilities/function_utility';
import * as AnimalUtility            from '../../utilities/animal_utility';
import { defaultErrorAlert }         from '../../utilities/error_utility';

//--------------------------------------------------------------------//

/*
Required Screen Props:
  -
Optional Screen Props:
  isLogin (bool): if this is a new user coming to HomeScreen for first time
*/
class HomeScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    }

    this.isSharedPressed = false;
    this.isJoinQueuePressed = false;
  }

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  componentDidMount() {
    if (this.props.isLogin) {
      this._onPressJoinQueue();
    }
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _onPressShare = () => {
    if (this.isSharedPressed) {
      return;
    }

    this.isSharedPressed = true;

    let animalSound = AnimalUtility.ANIMAL_SOUNDS[getRandomInt(AnimalUtility.ANIMAL_SOUNDS.length)];
    let client = this.props.usersCache[this.props.client.id];
    let oppositeParty = AnimalUtility.getOppositeParty(client);

    RN.Share.share({message: animalSound + "! I'm talking to a " + oppositeParty + " on the Animal Party app. You should try it, too!\n\n-- Download Now --\nhttps://animalparty.app/?utm_source=app&utm_term=share" })
      .finally(() => {
        this.isSharedPressed = false;
      });
  }

  _onPressJoinQueue = () => {
    if (this.isJoinQueuePressed) {
      return;
    }

    this.isJoinQueuePressed = true;

    this.setState({ isLoading: true } , () => {
      this.props.requestConnection(this.props.client.authToken, this.props.client.firebaseUserObj, this.props.client.id)
        .catch((error) => {
          defaultErrorAlert(error);
        })
        .finally(() => {
          this.isJoinQueuePressed = false;
          this.setState({ isLoading: false });
        });
    });
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderItem = ({item}) => {
    return (
      <ConnectionListItemContainer userId={item} />
    )
  }

  _renderSectionHeader = ({section}) => {
    return (
      <SectionListHeader title={section.title} />
    )
  }

  _renderHeader = () => {
    return (
      <RN.View>
        <ListHeaderContainer text={'Share App With Friends'} iconName={'share'} callback={this._onPressShare} />
      </RN.View>
    )
  }

  _renderFooter = () => {
    let client = this.props.usersCache[this.props.client.id];
    let footerWidth = !client.queued_at ? scaleFont(240) : scaleFont(150);
    let text = 'No More Conversations' + (!client.queued_at ? '?' : '');
    let highlightedText = !client.queued_at ? ' Join Queue' : null;
    let callback = !client.queued_at ? this._onPressJoinQueue : null;

    return (
      <RN.View>
        <ListFooterContainer footerWidth={footerWidth} text={text} highlightedText={highlightedText} callback={callback} />
      </RN.View>
    )
  }

  _renderList() {
    return (
      <RN.SectionList
        sections={[{data: this.props.connections, renderItem: this._renderItem.bind(this), title: 'Conversations'}]}
        keyExtractor={(item, index) => String(index)}
        renderSectionHeader={this._renderSectionHeader.bind(this)}
        ListHeaderComponent={this._renderHeader()}
        ListFooterComponent={this._renderFooter()}
        initialNumToRender={20}
        windowSize={20}
        showsVerticalScrollIndicator={true}
        stickySectionHeadersEnabled={false}
      />
    )
  }

  _renderLoadingModal() {
    return (
      <LoadingModal isLoading={this.state.isLoading}/>
    )
  }

  render() {
    return (
      <RN.View style={UTILITY_STYLES.containerStart}>
        {this._renderList()}
        {this._renderLoadingModal()}
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default HomeScreen;
