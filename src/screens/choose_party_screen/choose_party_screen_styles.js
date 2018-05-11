// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility';

//--------------------------------------------------------------------//

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  blueView: {
    width: '50%',
    height: '100%',
    backgroundColor: 'blue',
  },
  redView: {
    width: '50%',
    height: '100%',
    backgroundColor: 'red',
  }
});
