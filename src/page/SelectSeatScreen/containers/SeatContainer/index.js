import React from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import SeatItem from '../../components/SeatItem';
import ThumbnailSet from '../ThumbnailSet';

const {width: deviceWidth} = Dimensions.get('window');

export default ({
  seatList,
  screenName,
  status,
  selected = [],
  selectSeat,
  seatThumbnailContainer,
  setSeatThumbnailContainer,
  animateLeft,
  haveCheckImg,
}) => {
  const [seatContainer, setSeatContainer] = React.useState({});
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 30,
        }}>
        <View style={styles.screen}>
          <Text
            numberOfLines={1}
            style={{textAlign: 'center', color: '#777777'}}>
            {screenName}
          </Text>
        </View>
      </View>
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {renderLine(seatContainer, status)}
          <View
            collapsable={false}
            style={{paddingLeft: 22, marginTop: 10, paddingRight: 15}}
            onLayout={e => setSeatContainer(e.nativeEvent.layout)}>
            {seatList &&
              seatList.length &&
              seatList.map((item, index) => (
                <View style={{flexDirection: 'row'}} key={index}>
                  {item.map((val, key) => (
                    <SeatItem
                      placeholder={index === 2 && key === 3}
                      row={index}
                      column={key}
                      rowData={item}
                      haveCheckImg={haveCheckImg}
                      key={key}
                      val={val}
                      selected={
                        selected.filter(
                          pre => pre.row === index && pre.column === key,
                        ).length > 0
                      }
                      isMax={selected.length === 6}
                      onPress={selectSeat}
                    />
                  ))}
                </View>
              ))}
          </View>
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 5,
            backgroundColor: 'rgba(51,51,51,0.3)',
            paddingTop: 10,
            borderRadius: 10,
          }}>
          {seatList.map((item, index) => {
            return (
              <View key={index} style={styles.row}>
                <Text style={{color: '#fff'}}>
                  {item ? item[item.findIndex(it => it)]?.phyRowId : ''}
                </Text>
              </View>
            );
          })}
        </View>
        <ThumbnailSet
          animateLeft={animateLeft}
          seatList={seatList}
          selected={selected}
          seatThumbnailContainer={seatThumbnailContainer}
          setSeatThumbnailContainer={setSeatThumbnailContainer}
        />
      </View>
    </>
  );
};

const getArray = num => {
  const array = [];
  for (let i = 0; i < num; i++) {
    array.push(i);
  }
  return array;
};

const renderLine = (seatContainer, status) => {
  const {height = 0, width = 0} = seatContainer;
  const itemHeight = 5;
  const lines = getArray(parseInt(height / itemHeight));
  return status === 'LOADING' ? null : (
    <View
      style={{
        height: '100%',
        position: 'absolute',
        left: width / 2 + 1,
        width: 1,
      }}>
      {lines.map((item, index) => (
        <View key={index} style={[styles.line, {height: itemHeight}]} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: deviceWidth / 2,
    borderBottomLeftRadius: deviceWidth / 4,
    borderBottomRightRadius: deviceWidth / 4,
    backgroundColor: '#DCDCDC',
    overflow: 'hidden',
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  row: {
    width: 20,
    height: 20,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 2,
  },
  info: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    backgroundColor: '#ddd',
    marginBottom: 5,
  },
});
