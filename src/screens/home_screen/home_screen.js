// Library Imports
import React from 'react';
import RN    from 'react-native';

// Local Imports
import ConnectionListItemContainer  from '../../components/connection_list_item/connection_list_item_container';
import SectionListHeader            from '../../components/section_list_header/section_list_header';
import ListHeader                   from '../../components/list_header/list_header';
import { UTILITY_STYLES }           from '../../utilities/style_utility';
import { isStringEmpty }            from '../../utilities/function_utility';
import { ANIMAL_SOUNDS }            from '../../utilities/animal_utility';

//--------------------------------------------------------------------//

/*
Required Screen Props:
  -
Optional Screen Props:
  -
*/
class HomeScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.isSharedPressed = false;
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _onPressShare = () => {
    if (this.isSharedPressed) {
      return;
    }

    this.isSharedPressed = true;

    let animalSound = ANIMAL_SOUNDS[Math.floor(Math.random() * ANIMAL_SOUNDS.length)];
    let oppositeParty;
    let client = this.props.usersCache[this.props.client.id];
    let clientParty = client ? client.political_party : null;

    if (clientParty === 'DEMOCRAT') {
      oppositeParty = 'Republicans';
    } else if (clientParty === 'REPUBLICAN') {
      oppositeParty = 'Democrats'
    } else {
      oppositeParty = 'members of the oppositve political party'
    }

    // TODO: make sure this fits in Tweet limit
    RN.Share.share({message: animalSound + "! I'm talking to " + oppositeParty + " on the Animal Party app! \n\n-- Download Now --\nhttps://animalparty.app/?utm_source=app&utm_term=share" })
      .finally(() => {
        this.isSharedPressed = false;
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
        <ListHeader text={'Share App With Friends'} iconName={'share'} callback={this._onPressShare} />
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
        initialNumToRender={20}
        windowSize={20}
        showsVerticalScrollIndicator={true}
        stickySectionHeadersEnabled={false}
      />
    )
  }

  render() {
    return (
      <RN.View style={UTILITY_STYLES.containerStart}>
        {this._renderList()}
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default HomeScreen;
