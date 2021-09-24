import * as React from 'react';
import {
  Dimensions,
  Platform,
  PixelRatio,
  StyleSheet,
  LayoutAnimation,
  ToastAndroid,
  NativeModules,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import RootSiblings from 'react-native-root-siblings';
import moment from 'moment';
import {Alert, SharePanel, AlertInput, AlertPanel} from '../common/Alert';
import {navigate} from './rootNavigation';
import AlertRadio from '../common/Alert/AlertRadio';
import Loading from '../common/Alert/Loading';
import httpConfig from '../api/httpConfig';

const RCTToast =
  Platform.OS === 'android' ? ToastAndroid : NativeModules.LRDRCTSimpleToast;
const Toast = {
  SHORT: RCTToast.SHORT,
  LONG: RCTToast.LONG,
  TOP: RCTToast.TOP,
  BOTTOM: RCTToast.BOTTOM,
  CENTER: RCTToast.CENTER,

  show(message, duration = this.SHORT) {
    RCTToast.show(message, duration);
  },

  toast(message, duration = this.SHORT, gravity = this.CENTER) {
    RCTToast.showWithGravity(message, duration, gravity);
  },
};

const {width, height} = Dimensions.get('window');

// iphone6 像素
const isIos = Platform.OS === 'ios';
const basePx = isIos ? 750 : 720;

const Px2Dp = px => {
  const layoutSize = (px / basePx) * width;

  return PixelRatio.roundToNearestPixel(layoutSize);
};

const FontSize = size => {
  if (width < 360) {
    return size - 1;
  }
  if (height < 667) {
    // iphone 5
    return size;
  }
  if (height >= 667 && height <= 735) {
    // iphone 6-6s
    return size + 1;
  }
  if (height >= 735) {
    return size + 2;
  }
  return size;
};

const isIPhoneX = () => {
  return Platform.OS === 'ios' && DeviceInfo.hasNotch();
};

const elevationShadowStyle = (elevation, shadowColor = 'rgba(0,0,0,0.4)') => {
  return {
    elevation,
    shadowColor,
    shadowOffset: {width: 0, height: 0.2 * elevation},
    shadowOpacity: 0.3,
  };
};

const alertAlert = (
  title = '',
  content = '',
  ok = () => console.log('OK Pressed'),
  cancel = () => console.log('OK Pressed'),
) => {
  Alert.alert(
    title,
    content,
    [
      {text: '确定', onPress: ok},
      {text: '取消', onPress: cancel},
    ],
    {
      cancelable: false,
    },
  );
};

const minLineHeight = () => {
  return 1 / PixelRatio.get();
};

const startAnimation = (duration = 200, callback) => {
  LayoutAnimation.configureNext(
    {
      duration, // 持续时间
      create: {
        type: LayoutAnimation.Types.linear,
        property: 'opacity',
      },
      update: {
        type: 'linear',
      },
    },
    () => {},
  );
  if (callback) {
    callback();
  }
};

const getVersion = () => {};

/**
 *   @param title
 *   @param content
 *   @param buttons
 *   @param options
 */
const alert = (
  content = '',
  title = '温馨提示',
  buttons = [],
  options = {},
  closeBtnStatus = '',
  closeBtn = true,
) => {
  if (global.siblingAlert) {
    global.siblingAlert.destroy();
  }
  navigate('Alert', {
    component: 'alert',
    content,
    title,
    buttons,
    options,
    closeBtnStatus,
    closeBtn,
  });
};

const confirm = (
  content = '请确认',
  title = '温馨提示',
  onPressConfirm = close => close(),
  confirmText = '确认',
) => {
  const btns = [
    {style: 'cancel'},
    {text: confirmText, onPress: onPressConfirm},
  ];
  navigate('Alert', {
    component: 'alert',
    content,
    title,
    buttons: btns,
  });
};

const confirmLogin = () =>
  confirm(
    '请先登录',
    undefined,
    close => {
      close();
      navigate('MyModal', {screen: 'LoginScreen'});
    },
    '去登录',
  );

const prompt = (
  content = '',
  title = '请输入',
  onPress,
  bottomTip = '',
  options = {},
) => {
  const opt = {
    headStyle: {
      backgroundColor: '#ffffff',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#e5e5e5',
    },
    headTextStyle: {
      color: '#333',
    },
    closeColor: '#333',
    contentStyle: {
      borderBottomWidth: 0,
    },
    bottomTip,
    ...options,
  };
  const btns = [
    {
      text: '确认',
      onPress,
      btnTextStyle: {
        backgroundColor: '#ffffff',
      },
      btnStyle: {
        backgroundColor: '#FC5869',
        marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 24,
        borderRadius: 20,
      },
    },
  ];
  navigate('Alert', {
    title,
    content,
    buttons: btns,
    options: opt,
    component: 'alert',
  });
};

const alertShare = (onItemPress, onCancel, title = '分享给好友') => {
  if (global.siblingShare) {
    global.siblingShare.destroy();
    onCancel();
    global.siblingShare = undefined;
  } else {
    global.siblingShare = new RootSiblings(
      (
        <SharePanel
          onItemPress={onItemPress}
          onCancel={onCancel}
          title={title}
        />
      ),
    );
  }
};

const alertRadio = (title, values, defaultValue, onSubmit = () => {}) => {
  if (global.siblingRadio) {
    global.siblingRadio.destroy();
  }
  global.siblingRadio = new RootSiblings(
    (
      <AlertRadio
        title={title}
        values={values}
        defaultValue={defaultValue}
        onSubmit={onSubmit}
      />
    ),
  );
};

const alertInput = (
  title = '编辑',
  subtitle = '',
  desc = '请输入',
  value = '',
  onSubmit = () => {},
) => {
  if (global.siblingInput) {
    global.siblingInput.destroy();
  }
  global.siblingInput = new RootSiblings(
    <AlertInput title={title} value={value} onSubmit={onSubmit} />,
  );
};

const alertPanel = (
  title = '结算明细',
  subtitle = '',
  list = [],
  data,
  bottom = () => {},
) => {
  if (global.siblingPanel) {
    global.siblingPanel.destroy();
  }
  global.siblingPanel = new RootSiblings(
    (
      <AlertPanel list={list} data={data} title={title} subtitle={subtitle}>
        {bottom()}
      </AlertPanel>
    ),
  );
};

const loading = () => {
  if (global.siblingLoad) {
    global.siblingLoad.destroy();
  }
  global.siblingLoad = new RootSiblings(<Loading />);
};

const getNum = (num, normal = false) => {
  if (!num) {
    return 0;
  }
  const unit = normal ? '万' : 'w';
  if (num < 1000) {
    return num;
  }
  if (num < 10000) {
    return num;
  }
  return `${(num / 10000).toFixed(1)}${unit}`;
};

const getHeaderTopPadding = () => {
  let paddingTop = 0;
  const IPhoneXPaddingTop = 24;
  const iosStatusBarHeight = 20;
  if (isIos) {
    paddingTop = iosStatusBarHeight;
  }
  if (isIPhoneX()) {
    paddingTop = IPhoneXPaddingTop + iosStatusBarHeight;
  }
  return paddingTop;
};

const getBottomMargin = () => (isIPhoneX() ? 24 : 0);

const getConstantDeviceInfo = async () => {
  const deviceJSON = {};
  try {
    deviceJSON.version = DeviceInfo.getVersion(); // 获取应用程序版本
    deviceJSON.uniqueId = DeviceInfo.getUniqueId(); // 获取uniqueId
    deviceJSON.systemVersion = DeviceInfo.getSystemVersion(); // 获取系统版本
    deviceJSON.systemName = DeviceInfo.getSystemName(); // 获取操作系统名称
    deviceJSON.bundleId = DeviceInfo.getBundleId(); // 包名
    deviceJSON.model = DeviceInfo.getModel(); // 手机型号
    deviceJSON.appName = DeviceInfo.getApplicationName(); // APP名字
    deviceJSON.userAgent = await DeviceInfo.getUserAgent();
  } catch (e) {
    console.log(e);
  }
  return deviceJSON;
};

const getImage = (uri, isAvatar = true) => {
  if (isAvatar) {
    if (uri) {
      return `${httpConfig.mediaUrl}${uri}`;
    }
    return require('../assets/images/defaultAvtar.png');
  }
  if (uri) {
    return `${httpConfig.mediaUrl}${uri}`;
  }
  return null;
};

const formatDate = date => moment(date).format('YYYY-MM-DD');

export default {
  Px2Dp,
  FontSize,
  isIPhoneX,
  isIos,
  alertAlert,
  minLineHeight,
  elevationShadowStyle,
  // Toast,
  getVersion,
  startAnimation,
  getNum,
  getHeaderTopPadding,
  getBottomMargin,
  alert,
  confirm,
  confirmLogin,
  prompt,
  alertInput,
  alertPanel,
  alertShare,
  alertRadio,
  loading,
  getConstantDeviceInfo,
  getImage,
  Toast,
  formatDate,
};
