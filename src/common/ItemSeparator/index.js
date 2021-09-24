import {View} from 'react-native';
import React from 'react';

const ItemSeparator = ({containerStyle, lineStyle}) => {
  return (
    <View style={[{backgroundColor: '#fff', paddingLeft: 15}, containerStyle]}>
      <View style={[{backgroundColor: '#C8C7CC', height: 1}, lineStyle]} />
    </View>
  );
};

export default ItemSeparator;
