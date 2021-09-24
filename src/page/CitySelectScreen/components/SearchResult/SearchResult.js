import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  Button,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';

const {width} = Dimensions.get('window');

const propTypes = {
  onChangeTextKeyword: PropTypes.func,
};

const defaultProps = {};

const SearchResult = ({onChangeTextKeyword, ...props}) => {
  const [value, setValue] = useState('');

  const onChangeSearch = vv => {
    setValue(vv);
    onChangeTextKeyword(vv);
  };

  return (
    <View style={styles.headerView}>
      <TextInput
        containerStyle={styles.container}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        onChangeText={vv => onChangeSearch(vv)}
        placeholder="输入城市名字或拼音查询"
        value={value}
        leftIcon={
          <Image
            style={styles.leftIcon}
            source={require('../../../../assets/images/citySelect/search.png')}
          />
        }
        rightIcon={<Button type="clear" title="搜索" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 1,
  },
  input: {
    width: '67%',
    height: 46,
    backgroundColor: '#fff',
    padding: 0,
    paddingBottom: 0,
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
});

SearchResult.propTypes = propTypes;
SearchResult.defaultProps = defaultProps;

export default SearchResult;
