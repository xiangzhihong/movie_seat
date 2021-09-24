import React, {useState, useContext} from 'react';
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
  keyword: PropTypes.string,
  onChangeTextKeyword: PropTypes.func,
};

const defaultProps = {
  onChangeTextKeyword: () => {},
};

const SearchBox = ({
  keyword,
  onChangeTextKeyword,
  isFocused,
  searchSubmit,
  ...props
}) => {
  return (
    <View style={styles.headerView}>
      <TextInput
        {...props}
        containerStyle={styles.container}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        placeholder="输入城市名或拼音"
        leftIcon={
          <Image
            style={styles.leftIcon}
            source={require('../../../../assets/images/citySelect/search.png')}
          />
        }
        rightIcon={
          <Button
            onPress={() => searchSubmit(isFocused)}
            type="clear"
            title={!isFocused ? '搜索' : '取消'}
            textStyle={{color: '#FC5869'}}
            style={{marginRight: 5}}
          />
        }
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

SearchBox.propTypes = propTypes;
SearchBox.defaultProps = defaultProps;

export default SearchBox;
