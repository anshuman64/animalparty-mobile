// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility';

//--------------------------------------------------------------------//

export const styles = StyleSheet.create({
  icon: {
    width: 40,
    height: 40,
    position: 'absolute'
  },
  logo: {
    height: 40,
    position: 'absolute'
  },
  animatableView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 162
  },
  checkbox: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 33,
    height: 33,
    marginRight: 13,
    borderWidth: 1,
    borderColor: StyleUtility.COLORS.grey700
  },
  checkboxHighlighted: {
    borderColor: StyleUtility.COLORS.appleBlue
  },
  checkboxFilled: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 24,
    width: 24,
    backgroundColor: StyleUtility.COLORS.appleBlue
  },
  checkboxText: {
    width: 220,
    fontFamily: StyleUtility.setAndroidFont('Roboto-Light'),
    fontWeight: '100',
    fontSize: StyleUtility.scaleFont(14),
    textAlign: 'left',
    color: StyleUtility.COLORS.grey700,
  },
});


export const bounceInLeft = {
  0: {
    opacity: 0,
    translateX: -600,
    translateY: -3,
  },
  0.6: {
    opacity: 1,
    translateX: 20 - 45,
  },
  0.75: {
    translateX: -8 - 45,
  },
  0.9: {
    translateX: 4 - 45,
  },
  1: {
    translateX: 0 - 45,
    translateY: -3,
  },
};


export const bounceInDown = {
  0: {
    opacity: 0,
    translateY: -800,
    translateX: 54,
  },
  0.6: {
    opacity: 1,
    translateY: 25,
  },
  0.75: {
    translateY: -10,
  },
  0.9: {
    translateY: 5,
  },
  1: {
    translateY: 0,
    translateX: 54,
  },
};

export const fadeIn = {
  from: {
    opacity: 0,
    translateY: -60
  },
  to: {
    opacity: 1,
    translateY: -60
  }
}

export const translateAnimalLogo = {
  0: {
    translateX: 0 - 45,
    translateY: -3,
  },
  1: {
    translateX: 0 - 45,
    translateY: -3 - 160,
  }
}

export const translatePartyLogo = {
  0: {
    translateY: 0,
    translateX: 54,
  },
  1: {
    translateY: 0 - 160,
    translateX: 54,
  }
}

export const translateIcon = {
  0: {
    opacity: 1,
    translateY: -60
  },
  1: {
    opacity: 1,
    translateY: -60 - 160
  }
}
