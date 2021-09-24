import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window');

const HeaderLeft = ({renderLeftView, goBack}) => (
  <View style={styles.left}>
    {renderLeftView ? (
      renderLeftView()
    ) : (
      <TouchableOpacity style={{paddingVertical: 8}} onPress={goBack}>
        <Ionicons name="ios-arrow-back" size={24} style={{color: '#333'}} />
      </TouchableOpacity>
    )}
  </View>
);

const HeaderTitle = ({title, titleView, titleLayoutStyle, titleStyle}) => (
  <View style={[styles.titleContainer, titleLayoutStyle]}>
    {titleView || (
      <Text numberOfLines={1} style={[styles.title, titleStyle]}>
        {title}
      </Text>
    )}
  </View>
);

const HeaderRight = ({rightView}) => (
  <View style={styles.right}>{rightView}</View>
);

const CusHeader = ({
  renderLeftView,
  title,
  titleView,
  titleLayoutStyle,
  titleStyle,
  style,
  goBack,
  rightButton,
}) => {
  return (
    <View style={[styles.header, style]}>
      <HeaderLeft renderLeftView={renderLeftView} goBack={goBack} />
      <HeaderTitle
        title={title}
        titleView={titleView}
        titleLayoutStyle={titleLayoutStyle}
        titleStyle={titleStyle}
      />
      <HeaderRight rightView={rightButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === 'ios' ? (width >= 375 ? 40 : 10) : 0,
    height: 44 + (Platform.OS === 'ios' ? (width >= 375 ? 40 : 10) : 0),
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  left: {
    flex: 2,
    flexDirection: 'row',
  },
  right: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 5,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    color: '#222',
  },
});

export default CusHeader;
