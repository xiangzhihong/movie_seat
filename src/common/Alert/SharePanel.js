import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Animated,
  Easing,
  Dimensions,
  Image,
  PixelRatio,
} from 'react-native';
import * as React from 'react';
import {wechat, friend, sina, qq, download} from '../../assets/images/share';

const {width} = Dimensions.get('window');
const itemWidth = width / 3;

const BUTTONS = [
  {
    title: '微信好友',
    icon: wechat,
    type: 2,
  },
  {
    title: '微信朋友圈',
    icon: friend,
    type: 3,
  },
  {
    title: '新浪微博',
    icon: sina,
    type: 1,
  },
  {
    title: 'QQ好友',
    icon: qq,
    type: 0,
  },
  {
    title: '保存图片',
    icon: download,
    type: -1,
  },
];

export const ShareBody = ({onItemPress, showDownloadBtn = true}) => (
  <View style={styles.body}>
    {BUTTONS.map((item, index) => {
      if (!showDownloadBtn && index === 4) {
        return null;
      }
      return (
        <View style={styles.buttonItem} key={index}>
          <TouchableOpacity
            style={{justifyContent: 'center', alignItems: 'center'}}
            activeOpacity={0.7}
            onPress={() => onItemPress(item.type)}>
            <Image
              source={item.icon}
              style={{
                width: itemWidth / 3,
                height: itemWidth / 3,
                marginBottom: 6,
              }}
            />
            <Text style={styles.text}>{item.title}</Text>
          </TouchableOpacity>
        </View>
      );
    })}
  </View>
);

export default ({title = '分享给好友', onItemPress, onCancel = () => {}}) => {
  const top = new Animated.Value(0);

  React.useEffect(() => {
    show();
  }, []);

  const close = () => {
    Animated.timing(top, {
      duration: 120,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      global.siblingShare && global.siblingShare.destroy();
      onCancel();
      global.siblingShare = undefined;
    });
  };

  const show = () => {
    Animated.timing(top, {
      duration: 200,
      toValue: 1,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={close}
      style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            transform: [
              {
                translateY: top.interpolate({
                  inputRange: [0, 1],
                  outputRange: [300, 0],
                }),
              },
            ],
          },
        ]}>
        <Header title={title} close={close} />
        <ShareBody onItemPress={onItemPress} />
      </Animated.View>
    </TouchableOpacity>
  );
};

const Header = ({title, close}) => {
  return (
    <View style={styles.head}>
      <View style={styles.viewItem} />
      <View style={styles.viewItem}>
        <Text style={styles.subheading}>{title}</Text>
      </View>
      <View style={[styles.viewItem, styles.cancelItem]}>
        <TouchableOpacity activeOpacity={0.7} onPress={close}>
          <Text style={styles.cancelText}>取消</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  content: {
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  head: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
  },
  body: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 30,
    backgroundColor: '#fff',
    borderTopWidth: PixelRatio.roundToNearestPixel(0.4),
    borderTopColor: '#e5e5e5',
  },
  viewItem: {
    flex: 1,
    alignItems: 'center',
  },

  cancelItem: {
    alignItems: 'flex-end',
    paddingRight: 15,
  },
  cancelText: {
    color: '#999999',
  },

  subheading: {
    fontSize: 16,
  },

  text: {
    fontSize: 13,
    color: '#828282',
  },

  buttonItem: {
    alignItems: 'center',
    width: itemWidth,
    marginTop: 24,
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

  submitText: {
    color: '#FC5869',
  },
  borderRight: {
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: '#E5E5E5',
  },
});
