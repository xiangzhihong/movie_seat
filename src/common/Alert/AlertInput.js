import {
  View,
  StyleSheet,
  Text,
  Animated,
  Easing,
  Button,
  TextInput,
} from 'react-native';
import * as React from 'react';
import Container from './Container';

export default ({
  title = '编辑',
  subtitle = '',
  desc = '请输入',
  value = '',
  options = {},
  onSubmit,
  closeBtn = true,
}) => {
  let inputText = value;
  const opacity = new Animated.Value(0);
  const {
    headStyle = {
      backgroundColor: '#fff',
      borderBottomColor: '#ddd',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    headTextStyle = {color: '#333333'},
    closeColor = '#333333',
  } = options;

  const close = () => {
    Animated.timing(opacity, {
      duration: 120,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => global.siblingInput && global.siblingInput.destroy());
  };

  const show = () => {
    Animated.timing(opacity, {
      duration: 200,
      toValue: 1,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
    show();
  });

  const onTextSubmit = () => {
    onSubmit(inputText, close);
  };

  return (
    <Container
      title={title}
      headStyle={headStyle}
      closeBtn={closeBtn}
      headTextStyle={headTextStyle}
      closeColor={closeColor}
      close={close}
      opacity={opacity}>
      <View style={{padding: 20}}>
        <Text style={{color: '#777777'}}>{subtitle}</Text>
        <View
          style={{
            borderColor: '#ddd',
            borderWidth: StyleSheet.hairlineWidth,
            height: 36,
            paddingHorizontal: 6,
            marginTop: 4,
          }}>
          <TextInput
            onChangeText={e => {
              inputText = e;
            }}
            style={{flex: 1, padding: 0, textAlign: 'right'}}
            underlineColorAndroid="transparent"
            autoFocus
            placeholder={desc}
            defaultValue={value}
            returnKeyType="search"
            onSubmitEditing={onTextSubmit}
          />
        </View>
        <Button
          onPress={() => onTextSubmit()}
          title="确认"
          style={{marginTop: 20, borderRadius: 20}}
        />
      </View>
    </Container>
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
  contentText: {
    color: '#333333',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 24,
  },
  contentContainerStyle: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E5E5',
  },
  buttonContainer: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonItem: {
    alignItems: 'center',
    flex: 1,
    height: 44,
    justifyContent: 'center',
  },
  cancelText: {
    color: '#999999',
  },
  submitText: {
    color: '#FC5869',
  },
  borderRight: {
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: '#E5E5E5',
  },
  bottomTip: {
    marginHorizontal: 30,
    color: '#999',
    fontSize: 11,
    textAlign: 'center',
    marginTop: -14,
    marginBottom: 24,
  },
});
