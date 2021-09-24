import React, {useEffect, useRef} from 'react';
import {
  View,
  SectionList,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import ItemSeparatorComponent from '../../../../common/ItemSeparator';
import location from '../../../../assets/images/home/location.png';
import refresh from '../../../../assets/images/home/refresh.png';

const {width} = Dimensions.get('window');

const propTypes = {
  keyword: PropTypes.string,
  onChangeTextKeyword: PropTypes.func,
};

const defaultProps = {};

const CityList = ({
  onSelectCity,
  allCityList = [],
  currentCity,
  onCurrentCityPress,
  position: _position,
}) => {
  const listViewRef = useRef(null);

  useEffect(() => {
    console.log(allCityList);
  }, []);

  const city =
    currentCity && currentCity.city
      ? currentCity.city
      : '定位失败，请手动选择城市';

  const _cityNameClick = cityJson => {
    onSelectCity(cityJson);
  };

  const getLocation = async () => {
    // await PermissionsAndroid.request(
    //   PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    // );
    // const res = await Geocode.reverse({
    //   latitude: '29.604451007313266',
    //   longitude: '106.52727499999997',
    // });
    // _position(res);
  };

  const CityHeader = props => {
    const {currentCity = '上海', onCurrentCityPress} = props;
    return (
      <View>
        <View style={styles.sectionTitle}>
          <Text style={{fontSize: 15}}>当前城市</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onCurrentCityPress(currentCity)}
          style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <Image source={location} style={{width: 20, height: 20}} />
            <Text type="subheading" style={{marginLeft: 2}}>
              {currentCity}
            </Text>
          </View>
          <TouchableOpacity activeOpacity={0.7} onPress={() => getLocation()}>
            <Image source={refresh} style={{width: 20, height: 20}} />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  };

  const _renderListRow = (cityJson, rowId) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        key={`list_item_${cityJson.item.CITI_CD}`}
        style={styles.rowView}
        onPress={() => _cityNameClick(cityJson.item)}>
        <View style={styles.rowData}>
          <Text type="subheading">{cityJson.item.CITY_NAME}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const _scrollTo = (index, letter) => {
    listViewRef?.current?.scrollToLocation({itemIndex: 0, sectionIndex: index});
  };

  const _renderRightLetters = (letter, index) => {
    return (
      <TouchableOpacity
        key={`letter_idx_${index}`}
        activeOpacity={0.6}
        onPress={() => {
          _scrollTo(index, letter);
        }}>
        <View style={styles.letter}>
          <Text>{letter}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <SectionList
        getItemLayout={(param, index) => ({
          length: 44,
          offset: 44 * index,
          index,
        })}
        ListHeaderComponent={
          <CityHeader
            currentCity={city}
            onCurrentCityPress={onCurrentCityPress}
          />
        }
        ref={listViewRef}
        sections={allCityList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={_renderListRow}
        ItemSeparatorComponent={() => <ItemSeparatorComponent />}
        renderSectionHeader={({section: {name}}) => (
          <View style={styles.sectionTitle}>
            <Text style={{fontSize: 15}}>{name}</Text>
          </View>
        )}
        stickySectionHeadersEnabled={true}
      />
      <View style={styles.letterSpace}>
        {allCityList.map((item, index) =>
          _renderRightLetters(item.name, index),
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  sectionTitle: {
    paddingVertical: 5,
    paddingLeft: 12,
    backgroundColor: '#F3F4F5',
  },
  iconContainer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftIconContainer: {
    marginEnd: 12,
  },
  rightIconContainer: {
    marginStart: 8,
  },
  headerView: {
    width: width,
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  leftIcon: {
    width: 15,
    height: 13,
    marginLeft: 15,
    marginRight: 5,
  },
  rowView: {
    paddingLeft: 12,
    backgroundColor: '#fff',
  },
  rowData: {
    width: width,
    height: 44,
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    height: 44,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  letter: {
    marginBottom: 3,
  },
  letterSpace: {
    position: 'absolute',
    right: 4,
    bottom: 0,
    top: 0,
    justifyContent: 'center',
  },
});

CityList.propTypes = propTypes;
CityList.defaultProps = defaultProps;

export default CityList;
