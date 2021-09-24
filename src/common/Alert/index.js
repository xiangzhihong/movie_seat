import * as React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Animated,
  ScrollView,
} from 'react-native';
import Container from './AlertContainer';
import SharePanel from './SharePanel';
import AlertInput from './AlertInput';
import AlertPanel from './AlertPanel';
import {goBack} from '../../utils/rootNavigation';

const Alert = ({
  title = '温馨提示',
  content = '',
  buttons = [],
  options = {},
  closeBtnStatus = '',
  closeBtn = true,
}) => {
  const opacity = new Animated.Value(0);
  const {
    submitText = '确定',
    headStyle,
    headTextStyle,
    closeColor,
    contentStyle,
    bottomTip,
  } = options;

  const close = () => {
    goBack();
  };

  const renderContent = () => {
    if (typeof content === 'string') {
      return (
        <Text
          style={[
            styles.contentText,
            {textAlign: closeBtnStatus !== '' ? 'left' : 'center'},
          ]}>
          {content}
        </Text>
      );
    }
    if (typeof content === 'function') {
      return content();
    }
    return content;
  };

  return (
    <Container
      title={title}
      headStyle={headStyle}
      headTextStyle={headTextStyle}
      closeColor={closeColor}
      closeBtn={closeBtn}
      close={close}
      opacity={opacity}>
      <ScrollView style={[styles.contentContainerStyle, contentStyle]}>
        {renderContent()}
      </ScrollView>
      <Button close={close} buttons={buttons} submitText={submitText} />
      {bottomTip ? <Text style={styles.bottomTip}>{bottomTip}</Text> : null}
    </Container>
  );
};

const Button = ({buttons, submitText, close}) => {
  const renderButton = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        {buttons.map((item, index) => {
          const {text, onPress, style, btnStyle, btnTextStyle} = item;
          const showBorder = buttons.length > 1 && index < buttons.length - 1;
          const isCancel = style === 'cancel';
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                if (isCancel) {
                  close();
                } else {
                  onPress();
                }
              }}
              style={[
                styles.buttonItem,
                showBorder && styles.borderRight,
                btnStyle,
              ]}
              key={index}>
              <Text
                style={[
                  isCancel ? styles.cancelText : styles.submitText,
                  btnTextStyle,
                ]}>
                {text || (isCancel ? '取消' : '')}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View>
      {buttons.length > 0 ? (
        renderButton()
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={close}
          style={styles.buttonContainer}>
          <Text>{submitText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export {Alert, SharePanel, AlertInput, AlertPanel};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
    maxHeight: 500,
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
