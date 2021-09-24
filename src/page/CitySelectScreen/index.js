import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import PropTypes from 'prop-types';

import {CityList} from './components';
import apiRequest from '../../api';
import CusHeader from '../../common/Header/CusHeader';

const CitySelectScreen = ({location = '上海市', navigation}) => {
  let inputRef = null;
  const [cities, setCities] = useState([]);
  const [currentCityList, setCurrentCityList] = useState({});
  const [isFocused, setIsFocused] = useState(false);
  const [result, setResult] = useState([]);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    getCities();
  }, []);

  const onChangeText = e => {
    setKeyword(e);
  };

  const onSelectCity = city => {
    setTimeout(() => {
      navigation.navigate('SelectCinemaScreen', {
        title: city.CITY_NAME,
        CITY_CD: city.CITY_CD,
      });
    }, 200);
    setResult([]);
  };

  const searchSubmit = () => {
    if (isFocused) {
      inputRef.blur();
      setIsFocused(false);
      setResult([]);
      Keyboard.dismiss();
    } else {
      setIsFocused(true);
      inputRef.focus();
    }
  };

  const getCities = async () => {
    let url = 'https://prd-api.cgv.com.cn/product/areas/that/group';
    const res = await apiRequest.get(url);
    setCities(res);
  };

  const searchCities = async () => {
    let url = 'https://prd-api.cgv.com.cn/product/areas/that/group';
    const params = {condition: keyword};
    const res = await apiRequest.get(url, params);
    console.log(res[0].data);
    setResult(res[0].data);
  };

  const onCurrentPress = (name = '上海市') => {
    cities.map(item =>
      item.data.map(val => {
        if (val.CITY_NAME === name) {
          onSelectCity(val);
          return null;
        }
      }),
    );
  };

  const renderSearchView = () => {
    return (
      <View style={styles.searchView}>
        <TextInput
          style={{flex: 1}}
          assignRef={c => {
            inputRef = c;
          }}
          onChangeText={onChangeText}
          returnKeyType="search"
          onSubmitEditing={() => {
            if (keyword) {
              searchCities();
            }
          }}
          onFocus={() => setIsFocused(true)}
          placeholder="输入城市名或拼音"
        />
        <TouchableOpacity onPress={() => searchSubmit(isFocused)}>
          <Text style={styles.searchTxt}>{!isFocused ? '搜索' : '取消'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CusHeader title={'选择城市'} />
      {renderSearchView()}
      <View style={{flex: 1}}>
        {(!isFocused && !keyword && keyword.length < 1) || !isFocused ? (
          <CityList
            onCurrentCityPress={onCurrentPress}
            onSelectCity={onSelectCity}
            currentCity={location}
            allCityList={cities}
            currentCityList={currentCityList}
          />
        ) : (
          <SearchResult list={result} onSelectCity={onSelectCity} />
        )}
      </View>
    </View>
  );
};

const SearchResult = ({list, onSelectCity}) => {
  return (
    <View style={{marginTop: 10}}>
      {list.map((item, index) => (
        <TouchableOpacity
          activeOpacity={0.7}
          key={index.toString()}
          style={styles.rowView}
          onPress={() => {
            onSelectCity(item);
          }}>
          <View style={styles.rowdata}>
            <Text type="subheading">{item.CITY_NAME}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  searchView: {
    height: 48,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  searchTxt: {
    color: '#FC5869',
    marginRight: 5,
    fontSize: 16,
  },
  rowView: {
    backgroundColor: '#fff',
    height: 44,
    paddingLeft: 13,
    justifyContent: 'center',
  },
  leftIcon: {
    width: 28,
    height: 28,
    paddingLeft: 13,
  },
});

CitySelectScreen.propTypes = {
  cities: PropTypes.array,
  getCities: PropTypes.func,
};

export default CitySelectScreen;
