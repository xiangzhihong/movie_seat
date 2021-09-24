import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {tools} from '../../utils';

const ListItem = ({
  isTitle = false,
  isLast = false,
  label = '',
  text = '',
  labelType = 'normal',
  onPress,
  renderRight,
  renderIcon,
  style,
  title,
  intro,
  containerStyle,
  textStyle,
  titleStyle,
  renderTitle,
  titleContainerStyle,
  renderOther,
  introStyle,
  introProps,
  boxStyle,
}) => {
  const Container = onPress ? TouchableOpacity : View;
  return (
    <Container
      style={[{backgroundColor: '#fff'}, style]}
      activeOpacity={0.7}
      onPress={() => onPress && onPress()}>
      <View
        style={[
          styles.container,
          containerStyle,
          !isLast && {borderBottomWidth: tools.minLineHeight()},
        ]}>
        <View style={[styles.box, boxStyle]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {renderIcon ? renderIcon() : null}
            <View style={titleContainerStyle}>
              <View style={{flexDirection: 'row'}}>
                {label ? <Label text={label} labelType={labelType} /> : null}
              </View>
              {title ? (
                <Text type="label" style={[{color: '#222'}, titleStyle]}>
                  {title}
                </Text>
              ) : null}
              {renderTitle ? renderTitle() : null}
              {text ? (
                <Text
                  type={isTitle ? 'subheading' : 'label'}
                  style={[{color: isTitle ? '#222' : '#777'}, textStyle]}>
                  {text}
                </Text>
              ) : null}
              {intro ? (
                <Text type="label" {...introProps} style={introStyle}>
                  {intro}
                </Text>
              ) : null}
            </View>
          </View>
          {renderRight ? renderRight() : null}
        </View>
        {renderOther ? renderOther() : null}
      </View>
    </Container>
  );
};

const Label = ({text, labelType}) => {
  const {colors} = useTheme();
  return (
    <View
      style={[
        styles.label,
        {
          borderColor:
            labelType === 'normal' ? colors.activeTintColor : colors.blue,
        },
      ]}>
      <Text
        style={{
          color: labelType === 'normal' ? colors.activeTintColor : colors.blue,
        }}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderBottomWidth: 0.5,
    marginLeft: 15,
    marginRight: 15,
    borderBottomColor: '#E5E5E5',
  },
  box: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    paddingHorizontal: 4,
    borderWidth: tools.minLineHeight(),
    borderRadius: 2,
    marginBottom: 4,
  },
});

export default ListItem;
