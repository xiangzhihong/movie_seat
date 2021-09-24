import {
  TouchableOpacity,
  View,
  StyleSheet,
  Animated,
  Easing,
  Text,
  Dimensions,
  Platform,
} from 'react-native';
import * as React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

const {width} = Dimensions.get('window');

export const ShareBody = ({list, subtitle, data}) => {
  let arr = [];
  if (data) {
    arr = data?.oriprods?.reduce((obj, item) => {
      let find = obj.find(i => i.prod_cd === item.prod_cd);
      let _d = {
        ...item,
        qty: 1,
      };
      find
        ? ((find.stdAmt = (Number(find.stdAmt) + Number(item.stdAmt)).toFixed(
            2,
          )),
          (find.num += item.num),
          find.qty++)
        : obj.push(_d);
      return obj;
    }, []);
  }

  return (
    <View style={[styles.body, {paddingTop: 15}]}>
      {subtitle && (
        <Text style={{paddingHorizontal: 15, fontSize: 15, color: '#181818'}}>
          {subtitle}
        </Text>
      )}
      {list?.map((item, index) => {
        return (
          <View style={styles.buttonItem} key={index}>
            <Text style={styles.text}>{item.pay_type}</Text>
            <Text style={styles.text}>- ¥{item.pay_price}</Text>
          </View>
        );
      })}
      {data ? (
        <View>
          {data?.piaos?.length > 0 ? (
            <Text
              bold
              style={{
                paddingHorizontal: 15,
                paddingTop: 15,
                fontSize: 16,
                color: '#181818',
              }}>
              电影票
            </Text>
          ) : null}
          {data?.piaos?.length > 0 ? (
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 15,
                paddingTop: 15,
                justifyContent: 'space-between',
              }}>
              <Text style={styles.text}>票价</Text>
              <Text style={styles.text}>
                {data?.piaos[0]?.salePrice}*{data?.piaos?.length}
              </Text>
            </View>
          ) : null}
          {data?.youhuis?.filter(item => item.dsc_type === 'coupon')?.length >
          0 ? (
            <View
              style={{paddingHorizontal: 15, paddingRight: 0, paddingTop: 15}}>
              <Text style={styles.text}>
                优惠<Text>（含特惠活动+优惠券）</Text>
              </Text>
              <View style={{width: '100%'}}>
                {data?.youhuis
                  ?.filter(item => item.dsc_type === 'coupon')
                  ?.map((item, index) => {
                    return (
                      <View
                        style={[
                          styles.buttonItem,
                          {
                            marginRight: 0,
                            marginTop: 5,
                            paddingright: 0,
                            width: '100%',
                          },
                        ]}
                        key={index}>
                        <Text>{item.dsc_name}</Text>
                        <Text style={styles.text}>- ¥{item.dsc_price}</Text>
                      </View>
                    );
                  })}
              </View>
            </View>
          ) : null}
          {data?.mbrDscAmt > 0 ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 15,
                paddingTop: 15,
              }}>
              <Text style={styles.text}>
                朋友卡<Text>&nbsp;&nbsp;{data.mbrNm}</Text>
              </Text>
              <Text style={styles.text}>- ¥{data.mbrDscAmt}</Text>
            </View>
          ) : null}
          {data?.youhuis?.filter(item => item.dsc_type === 'voucher')?.length >
          0 ? (
            <View
              style={{paddingHorizontal: 15, paddingRight: 0, paddingTop: 15}}>
              <Text style={styles.text}>代金券</Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                {data?.youhuis
                  ?.filter(item => item.dsc_type === 'voucher')
                  ?.map((item, index) => {
                    return (
                      <View
                        style={[
                          styles.buttonItem,
                          {
                            marginTop: 5,
                            marginRight: 0,
                            paddingright: 0,
                            width: '100%',
                          },
                        ]}
                        key={index}>
                        <Text>{item.dsc_name}</Text>
                        <Text style={styles.text}>- ¥{item.dsc_price}</Text>
                      </View>
                    );
                  })}
              </View>
            </View>
          ) : null}
          {data?.oriprods?.length > 0 ? (
            <Text
              bold
              style={{
                paddingHorizontal: 15,
                paddingTop: 15,
                fontSize: 15,
                color: '#181818',
              }}>
              商品
            </Text>
          ) : null}
          {data?.oriprods?.length > 0 ? (
            <View>
              {arr?.map((item, index) => {
                return (
                  <View
                    style={[
                      styles.buttonItem,
                      {
                        marginTop: 5,
                        marginRight: 0,
                        paddingright: 0,
                        width: '100%',
                      },
                    ]}
                    key={index}>
                    <Text style={[styles.text, {width: width * 0.35}]}>
                      {item.prod_nm}
                    </Text>
                    <Text style={styles.text}>x{item.qty}</Text>
                    <Text style={styles.text}>¥{item.stdAmt}</Text>
                  </View>
                );
              })}
            </View>
          ) : null}
          {data?.mbrCardAmt > 0 ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 15,
                paddingTop: 15,
              }}>
              <Text style={styles.text}>
                朋友卡<Text>&nbsp;&nbsp;{data.mbrNm}</Text>
              </Text>
              <Text style={styles.text}>- ¥{data.mbrCardAmt}</Text>
            </View>
          ) : null}
          {data?.prod_youhuis?.length > 0 ? (
            <View
              style={{paddingHorizontal: 15, paddingRight: 0, paddingTop: 5}}>
              <Text style={styles.text}>
                优惠<Text>（含商品优惠券）</Text>
              </Text>
              <View>
                {data?.prod_youhuis?.map((item, index) => {
                  return (
                    <View
                      style={[
                        styles.buttonItem,
                        {
                          marginTop: 5,
                          marginRight: 0,
                          paddingright: 0,
                          width: '100%',
                        },
                      ]}
                      key={index}>
                      <Text>{item.dsc_name}</Text>
                      <Text style={styles.text}>x{item.qty}</Text>
                      <Text style={styles.text}>- ¥{item.dsc_price}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          ) : null}
          {data?.giftCardAmt > 0 ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 15,
                paddingTop: 15,
              }}>
              <Text style={styles.text}>
                星意卡<Text>&nbsp;&nbsp;{data.gftCardNm}</Text>
              </Text>
              <Text style={styles.text}>- ¥{data.giftCardAmt}</Text>
            </View>
          ) : null}
          {data?.jifen > 0 ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 15,
                paddingTop: 15,
              }}>
              <Text style={styles.text}>积分</Text>
              <Text style={styles.text}>- {data.use_posb_pint}</Text>
            </View>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};
export default ({title = '结算明细', subtitle, list = [], data, children}) => {
  const top = new Animated.Value(0);

  const close = () => {
    Animated.timing(top, {
      duration: 120,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      global.siblingPanel && global.siblingPanel.destroy();
      global.siblingPanel = undefined;
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

  React.useEffect(() => {
    show();
  });

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
        <ShareBody list={list} subtitle={subtitle} data={data} />
        <TouchableOpacity
          onPress={close}
          style={{height: 50, borderTopColor: '#e5e5e5', borderTopWidth: 0.5}}>
          {children}
        </TouchableOpacity>
      </Animated.View>
    </TouchableOpacity>
  );
};

const Header = ({title, close}) => {
  return (
    <View style={styles.head}>
      <Text style={styles.subheading}>{title}</Text>
      <TouchableOpacity activeOpacity={0.7} onPress={close}>
        <AntDesign name="close" size={25} color="#181818" />
      </TouchableOpacity>
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
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  body: {
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e5e5e5',
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
    color: '#000',
    fontWeight: 'bold',
  },

  text: {
    fontSize: 14,
    color: '#181818',
    fontFamily: Platform.OS === 'ios' ? null : '',
  },

  buttonItem: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    flexDirection: 'row',
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
