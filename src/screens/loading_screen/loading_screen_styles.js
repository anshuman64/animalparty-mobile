// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility';

//--------------------------------------------------------------------//

export const styles = StyleSheet.create({
  icon: {
    width: 45,
    height: 45
  },
});

export const flipIcon = {
  0: {
    rotate: '0deg',
    translateY: 0,
  },
  0.25: {
    rotate: '-90deg',
  },
  0.5: {
    rotate: '-180deg',
    translateY: 15,
  },
  0.75: {
    rotate: '-270deg',
  },
  1: {
    rotate: '-360deg',
    translateY: 0,
  },
};
