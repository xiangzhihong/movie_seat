import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';

export default ({icon, text, style, iconStyle}) => {
  return (
    <View style={[styles.box, style]}>
      <Image
        source={typeof icon === 'number' ? icon : {uri: icon}}
        style={[styles.icon, iconStyle]}
        resizeMode="contain"
      />
      {text ? <Text style={{color: '#777'}}>{text}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  icon: {
    width: 20,
    height: 22,
    marginRight: 4,
  },
});
