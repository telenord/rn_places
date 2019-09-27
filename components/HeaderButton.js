import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import isAndroid from '../constants/isAndroid';
import Colors from '../constants/Colors';

const CustomHeaderButton = props => {
  return <HeaderButton
    {...props}
    IconComponent={Ionicons}
    iconSize={23}
    color={isAndroid ? 'white' : Colors.primary}
  />
};

export default CustomHeaderButton;