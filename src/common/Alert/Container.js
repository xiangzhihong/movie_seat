import {TouchableOpacity, View, StyleSheet, Text, Animated} from 'react-native';
import * as React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default ({
  headStyle,
  headTextStyle,
  close,
  closeBtn,
  opacity,
  title,
  closeColor = '#fff',
  children,
}) => {
  return (
    <Animated.View
      disabled
      activeOpacity={1}
      onPress={close}
      style={[styles.container]}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          },
        ]}>
        <View style={[styles.head, headStyle]}>
          <View style={styles.holder} />
          <Text style={[styles.subheading, headTextStyle]}>{title}</Text>
          <Close
            close={closeBtn ? close : null}
            closeColor={closeBtn ? closeColor : '#FC5869'}
          />
        </View>
        {children}
      </Animated.View>
    </Animated.View>
  );
};

const Close = ({close, closeColor}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.closeBtn}
      onPress={close}>
      <AntDesign name="close" size={25} color={closeColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
  },
  content: {
    marginHorizontal: 40,
    backgroundColor: '#fff',
    borderRadius: 4,
    overflow: 'hidden',
  },
  head: {
    backgroundColor: '#FC5869',
    height: 44,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  holder: {
    height: 1,
    width: 30,
  },
  closeBtn: {
    padding: 8,
  },
  subheading: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelText: {
    color: '#999999',
  },
});
