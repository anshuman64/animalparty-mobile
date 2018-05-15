// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility';

//--------------------------------------------------------------------//

export const styles = StyleSheet.create({
  partyView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 1,
    borderWidth: 10,
    borderColor: StyleUtility.COLORS.grey50
  },
  choosePartyView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 70,
  },
  horizontalLine: {
    alignSelf: 'flex-start',
    width: (StyleUtility.getUsableDimensions().width - StyleUtility.scaleFont(150)) / 2 - 30, // Device width minus footerText width over 2 minus aesthetic value
    height: '50%',
    borderBottomWidth: 1.5,
    borderBottomColor: StyleUtility.COLORS.grey900,
    marginLeft: 15,
    marginRight: 15
  },
  choosePartyText: {
    fontFamily: StyleUtility.setAndroidFont('Roboto-Black'),
    fontSize: 24,
    fontWeight: '400',
    textAlign: 'center',
    color: StyleUtility.COLORS.grey900,
  },
  animal: {
    height: 120,
    tintColor: 'white'
  },
  titleText: {
    fontFamily: StyleUtility.setAndroidFont('Roboto-Black'),
    fontSize: 28,
    fontWeight: '400',
    textAlign: 'center',
    color: 'white',
    marginTop: 7
  },
  subtitleText: {
    fontFamily: StyleUtility.setAndroidFont('Roboto-Bold'),
    fontSize: 22,
    fontWeight: '400',
    textAlign: 'center',
    color: 'white',
    marginTop: 2
  },
});
