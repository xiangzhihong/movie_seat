import {
  View,
  StyleSheet,
  Text,
  Animated,
  Easing,
  Button,
  TouchableOpacity,
  Platform,
} from 'react-native';
import * as React from 'react';
import Feather from 'react-native-vector-icons/Feather';

export default ({title = '单选', values = [], defaultValue, onSubmit}) => {
  const [selectedValue, setSelectedValue] = React.useState(defaultValue);
  const opacity = new Animated.Value(0);

  const close = () => {
    Animated.timing(opacity, {
      duration: 120,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => global.siblingRadio && global.siblingRadio.destroy());
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

  const submit = () => {
    onSubmit(selectedValue);
    close();
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: opacity.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
        },
      ]}>
      <View style={styles.bg}>
        <Text style={styles.title}>{title}</Text>
        {values.map(v => (
          <TouchableOpacity
            activeOpacity={0.9}
            key={v}
            style={styles.item}
            onPress={() => setSelectedValue(v)}>
            <Text style={styles.itemText}>{v}</Text>
            {selectedValue === v ? (
              <Feather name="check-circle" color="#F1A23D" size={16} />
            ) : (
              <Feather name="circle" color="#ddd" size={16} />
            )}
          </TouchableOpacity>
        ))}
        <View style={styles.btns}>
          <Button
            onPress={close}
            title="取消"
            style={[styles.btn, styles.cancelBtn]}
            textStyle={[styles.btnText, styles.cancelBtnText]}
          />
          <Button
            title="确定"
            style={styles.btn}
            titleStyle={styles.btnText}
            onPress={submit}
          />
        </View>
      </View>
    </Animated.View>
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
    justifyContent: 'flex-end',
  },
  bg: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 16,
    color: '#222',
    textAlign: 'center',
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e5e5e5',
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e5e5e5',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 13,
    color: '#333',
    fontFamily: Platform.OS === 'ios' ? null : '',
  },
  btns: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 20,
  },
  btn: {
    height: 36,
    width: 115,
    borderRadius: 18,
  },
  cancelBtn: {
    backgroundColor: '#eee',
  },
  cancelBtnText: {
    color: '#777',
  },
  btnText: {
    fontSize: 16,
  },
});
