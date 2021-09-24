import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import TipCard from '../../../../common/TipCard';

const SelectTimeItem = ({
  title = '',
  content = '',
  info = '￥45',
  isDisContent = false,
  style,
  isActive = true,
  onItemPress,
  activeTintColor = '#FC5869',
  inactiveTintColor = '#000',
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onItemPress}
      style={[
        styles.container,
        style,
        {
          backgroundColor: isActive ? activeTintColor : '#fff',
          borderWidth: isActive ? 0 : 0.8,
        },
      ]}>
      <View style={[styles.title]}>
        {isDisContent ? (
          <TipCard
            style={{backgroundColor: isActive ? '#fff' : activeTintColor}}
            textStyle={{color: isActive ? activeTintColor : '#fff'}}
          />
        ) : null}
        <Text type="subheading" style={{color: isActive ? '#fff' : '#222'}}>
          {title}
        </Text>
      </View>
      <Text style={[styles.text, {color: isActive ? '#fff' : '#999'}]}>
        {content}{' '}
      </Text>
      <Text style={{color: isActive ? '#fff' : activeTintColor}} type={'label'}>
        {' '}
        {info}
        <Text
          style={{color: isActive ? '#fff' : activeTintColor}}
          type={'intro'}>
          起
        </Text>{' '}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    backgroundColor: '#fff',
    borderRadius: 4,
    marginRight: 8,
    borderColor: '#DDDDDD',
  },
  text: {
    marginVertical: 3,
    textAlign: 'center',
    color: '#999',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SelectTimeItem;
