import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const TipCard = ({text = '惠', style, textStyle}) => {
  return (
    <View style={[styles.discount, {backgroundColor: '#FC5869'}, style]}>
      <Text style={[{color: '#fff'}, textStyle]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  discount: {
    flexDirection: 'row',
    minWidth: 16,
    paddingHorizontal: 4,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 2,
    marginTop: 2,
    borderRadius: 5,
  },
});

export default TipCard;
