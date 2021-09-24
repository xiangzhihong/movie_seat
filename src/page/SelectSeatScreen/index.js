import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
  Text,
  Button,
  Easing,
} from 'react-native';
import Tip from '../../common/Tip';
import ListItem from '../../common/ListItem';
import SelectTimeContainers from './containers/SelectTimeContainers';
import SeatTopItem from './components/SeatTopItem';
import seats from '../../assets/images/seat';
import {AESUtils, tools} from '../../utils';
import date from '../../utils/date';
import Seat from './containers/SeatContainer';
import BottomSelected from './containers/BottomSelect';
import {canSelect} from '../../utils/seat';
import {goBack} from '../../utils/rootNavigation';
import apiRequest from '../../api';
import CusHeader from '../../common/Header/CusHeader';

const Left = new Animated.Value(0);

const {width} = Dimensions.get('window');

const res = require('../../assets/data/seat.json');

const SelectSeatScreen = () => {
  const [selected, setSelected] = React.useState([]);
  const [activeIndex, setAcitveIndex] = React.useState(0);
  const scnDyName = '今天';
  const scnDyDay = '20210923';
  const scnDy = {};
  const thatNm = '上海大宁电影院';
  const times = [];
  const [seatList, setSeatList] = React.useState([]);
  const [peopleList, setPeopleList] = React.useState([]);
  const [seatGrdPrcs, setSeatGrdPrcs] = React.useState([]);
  const [seatThumbnailContainer, setSeatThumbnailContainer] = React.useState(
    {},
  );
  const [screenN, setScreenN] = React.useState('');
  const [activity, setActivity] = React.useState(null);
  const [seeMovieStatus, setSeeMovieStatus] = React.useState(null);
  const [price, setPrice] = React.useState(0);
  const [showStatus, setShowStatus] = useState(true);
  const [cardPrice, setCardPrice] = React.useState(0);

  React.useEffect(() => {
    getSeat();
  }, []);

  const getSeat = async () => {
    setSeatList(res.otp_seat);
    setSeatGrdPrcs(res.seatGrdPrcs);
  };

  const show = cb => {
    Animated.timing(Left, {
      duration: 200,
      toValue: 1,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => cb && cb());
  };

  const close = () => {
    setTimeout(() => {
      Animated.timing(Left, {
        duration: 120,
        toValue: 0,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
    }, 500);
  };

  const selectSeat = (row, column, rowData = []) => {
    const isSet = selected.findIndex(
      item => item.row === row && item.column === column,
    );
    if (isSet < 0) {
      if (selected.length === 6) {
        tools.Toast.toast('最多只能购买6张票', 1);
        return null;
      }
    }
    let iscouple = false;
    let iscouplecolumn = [];
    const itemgroupcode = rowData[column].groupCode;
    const itemRowCol = rowData[column].logicColId + rowData[column].logicRowId;
    for (let i = 0; i < rowData.length; i++) {
      if (rowData[i] != null) {
        const targetgroupcode = rowData[i].groupCode;
        const targetRowCol = rowData[i].logicColId + rowData[i].logicRowId;
        if (itemgroupcode === targetgroupcode && itemRowCol !== targetRowCol) {
          iscouple = true;
          iscouplecolumn.push(i);
        }
      }
    }

    let res = null;
    if (iscouple) {
      if (selected.length >= 5 && isSet < 0) {
        tools.Toast.toast('您已经选择了5个座位，不能选择情侣座位', 1);
        return;
      }
      res = true;
    } else {
      res = canSelect({row, column}, rowData, selected, isSet >= 0);
    }

    if (isSet >= 0) {
      if (res) {
        // 可以取消
        if (iscouple) {
          selected.splice(isSet, 1);
          if (iscouplecolumn != null) {
            for (var i = 0; i < iscouplecolumn.length; i++) {
              let iscoupleSet = selected.findIndex(
                item => item.row === row && item.column === iscouplecolumn[i],
              );
              selected.splice(iscoupleSet, 1);
            }
          }
        } else {
          selected.splice(isSet, 1);
        }
        setSelected([...selected]);
        show(close);
        getPrice(selected);
      } else {
        tools.Toast.toast('请依次取消座位', 1);
      }
    } else if (res) {
      if (selected.length === 0) {
        const newArr = [];
        const obj = {
          row,
          column,
          phyRowId: rowData[column].phyRowId,
          phyColId: rowData[column].phyColId,
        };
        newArr.push(obj);
        if (iscouple) {
          if (iscouplecolumn != null) {
            for (var i = 0; i < iscouplecolumn.length; i++) {
              var objcouple = {
                row,
                column: iscouplecolumn[i],
                phyRowId: rowData[iscouplecolumn[i]].phyRowId,
                phyColId: rowData[iscouplecolumn[i]].phyColId,
              };
              newArr.push(objcouple);
            }
          }

          setSelected(newArr);
          getPrice(newArr);
        } else {
          setSelected([obj]);
          getPrice([obj]);
        }

        show(() => close());
      } else {
        const newArr = [...selected];
        const obj = {
          row,
          column,
          phyRowId: rowData[column].phyRowId,
          phyColId: rowData[column].phyColId,
        };
        if (iscouple) {
          if (iscouplecolumn != null) {
            for (var i = 0; i < iscouplecolumn.length; i++) {
              var objcouple = {
                row,
                column: iscouplecolumn[i],
                phyRowId: rowData[iscouplecolumn[i]].phyRowId,
                phyColId: rowData[iscouplecolumn[i]].phyColId,
              };
              newArr.push(objcouple);
            }
          }
          newArr.push(obj);
        } else {
          newArr.push(obj);
        }
        setSelected(newArr);
        show(() => close());
        getPrice(newArr);
      }
    } else {
      tools.Toast.toast('位置不能留空', 1);
    }
  };

  const getPrice = selectedSeat => {
    const currentTime = times[activeIndex];
    // const {activity} = currentTime;
    // setActivity(activity);
    let bktAmtPrices = 0;
    let noCardDscAmtPrices = 0;
    console.log(selectedSeat, bktAmtPrices, noCardDscAmtPrices);
    selectedSeat.map(item => {
      const data = seatList[item.row][item.column];
      const {bktAmt, minDscAmt, mbrCrdPrc, noCardDscAmt} = data;

      if (noCardDscAmt > 0 && noCardDscAmt < bktAmt) {
        bktAmtPrices += noCardDscAmt;
      } else {
        bktAmtPrices += bktAmt;
      }

      noCardDscAmtPrices += mbrCrdPrc;
    });
    setPrice(bktAmtPrices);
    setCardPrice(noCardDscAmtPrices);
  };

  async function onSubmit() {

  }

  const onTimePress = (item, _index) => {
    if (activeIndex === _index) {
      return null;
    }
    setSelected([]);
    setPrice(0);
    setCardPrice(0);
    setAcitveIndex(_index);
    const {
      screenCd: _screenCd,
      scnSchSeq: _scnSchSeq,
      screenName: _screenName,
    } = item;
    setScreenN(_screenName);
    getSeat(_screenCd, _scnSchSeq);
  };

  function renderSelectSet() {
    return (
      <BottomSelected
        currentTime={times[activeIndex]}
        seatList={seatList}
        selected={selected}
        selectSeat={selectSeat}
      />
    );
  }

  function renderPrice() {
    return (
      <ListItem
        renderRight={() => (
          <View style={{flexDirection: 'row'}}>
            {price > cardPrice && cardPrice > 0 ? (
              <View style={[styles.infoContainer, {borderColor: '#F1A23D'}]}>
                <View style={[styles.info, {backgroundColor: '#F1A23D'}]}>
                  <Text style={{color: '#fff'}}>E优卡</Text>
                </View>
                <View style={styles.info}>
                  <Text style={{color: '#F1A23D'}}>￥{cardPrice}</Text>
                </View>
              </View>
            ) : null}
            <Text bold style={{color: '#FC5869'}}>
              ￥
              <Text type="heading" bold style={{color: '#FC5869'}}>
                {price.toFixed(1)}
              </Text>
            </Text>
          </View>
        )}
        text="一次最多可选择6个座位"
      />
    );
  }

  function renderPayBtn() {
    return (
      <Button
        color={'#FC5869'}
        title={selected.length === 0 ? '选择座位' : '确认选座'}
        onPress={onSubmit}
      />
    );
  }

  function renderTip() {
    return showStatus ? (
      <Tip
        contentStyle={{color: '#fff'}}
        titleStyle={{color: '#fff'}}
        contentLeft="您购买的是"
        title={` ${thatNm} ${scnDyName} ${date.getMonth(
          scnDy,
        )}月${scnDyDay}日 `}
        contentRight="的场次，请核对后购买~"
        style={{backgroundColor: '#F1A23D'}}
      />
    ) : null;
  }

  function renderHeader() {
    return !showStatus ? (
      <MovieHeader
        activeIndex={activeIndex}
        movName={thatNm}
        scnDyDay={scnDyDay}
        scnDyName={scnDyName}
        times={times}
      />
    ) : null;
  }

  function renderTime() {
    return (
      <SelectTimeContainers
        times={times}
        activeIndex={activeIndex}
        onPress={onTimePress}
      />
    );
  }

  function renderIntroTip() {
    return (
      <Tip
        contentStyle={{color: '#777'}}
        contentType="label"
        contentLeft="温馨提示：如果3D版本电影，可免费使用经过消毒的3D眼镜"
        style={{backgroundColor: '#FEF7EC'}}
      />
    );
  }

  function renderSetHeader() {
    return (
      <View style={styles.seat}>
        <SeatTopItem
          icon={seats.common}
          text="可选"
          style={{width: width / 5}}
        />
        <SeatTopItem
          icon={seats.common05}
          text="已选"
          style={{width: width / 5}}
        />
        <SeatTopItem
          icon={seats.common06}
          text="已售"
          style={{width: width / 5}}
        />
        <SeatTopItem
          icon={seats.common01_Yellow}
          text="线上优选"
          style={{width: width / 5}}
        />
        <SeatTopItem
          icon={seats.corona}
          text="停售"
          style={{width: width / 5}}
        />
        {seatGrdPrcs?.findIndex(ite => ite.typeNm === 'lovers') > -1 ? (
          <SeatTopItem
            icon={seats.lovers}
            text="情侣座"
            style={{width: width / 5}}
          />
        ) : null}
        {seatGrdPrcs?.findIndex(ite => ite.typeNm === 'common02') > -1 ? (
          <SeatTopItem
            icon={seats.common02}
            text="优先座"
            style={{width: width / 5}}
          />
        ) : null}
        {seatGrdPrcs?.findIndex(ite => ite.typeNm === '4d') > -1 ? (
          <SeatTopItem
            icon={seats['4d']}
            text="4DX"
            style={{width: width / 5}}
          />
        ) : null}
        {seatGrdPrcs?.findIndex(ite => ite.typeNm === 'common01') > -1 ? (
          <SeatTopItem
            icon={seats.common01}
            text="特选座"
            style={{width: width / 5}}
          />
        ) : null}
        {seatGrdPrcs?.findIndex(ite => ite.typeNm === 'gold') > -1 ? (
          <SeatTopItem
            icon={seats.gold}
            text="GOLD"
            style={{width: width / 5}}
          />
        ) : null}
        {seatGrdPrcs?.findIndex(ite => ite.typeNm === 'widebox') > -1 ? (
          <SeatTopItem
            icon={seats.widebox}
            text="宽座"
            style={{width: width / 5}}
          />
        ) : null}
      </View>
    );
  }

  function renderSeatList() {
    return seatList && seatList.length > 0 ? (
      <Seat
        seatList={seatList}
        selectSeat={selectSeat}
        selected={selected}
        screenName={screenN}
        animateLeft={Left}
        seatThumbnailContainer={seatThumbnailContainer}
        setSeatThumbnailContainer={setSeatThumbnailContainer}
      />
    ) : null;
  }

  function renderLeft() {
    return null;
  }

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <CusHeader title={'选择座位'} renderLeftView={renderLeft()} />
      <ScrollView style={{flex: 1, backgroundColor: '#F3F4F5'}}>
        {renderTip()}
        {/*{renderHeader()}*/}
        {renderTime()}
        {renderIntroTip()}
        {renderSetHeader()}
        {renderSeatList()}
      </ScrollView>
      {renderSelectSet()}
      {renderPrice()}
      {renderPayBtn()}
    </View>
  );
};

const MovieHeader = ({
  movName,
  scnDyName,
  scnDyDay,
  times = [],
  activeIndex = 0,
}) => {
  const {scnFrTime, scnDy} = times[activeIndex];
  return (
    <View style={styles.movieHeader}>
      <Text bold type="subheading">
        {movName}
      </Text>
      <Text type="label">{`${scnDyName} ${date.getMonth(
        scnDy,
      )}月${scnDyDay}日 ${scnFrTime}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width / 2,
    borderBottomLeftRadius: width / 4,
    borderBottomRightRadius: width / 4,
    backgroundColor: '#DCDCDC',
    overflow: 'hidden',
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  screen: {
    width: width / 2,
    borderBottomLeftRadius: width / 4,
    borderBottomRightRadius: width / 4,
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
  movieHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 15,
    backgroundColor: '#fff',
    paddingBottom: 9,
  },
  seat: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    borderWidth: tools.minLineHeight(),
    borderRadius: 2,
    marginRight: 6,
  },
  info: {
    paddingHorizontal: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: '#181818',
    fontSize: 13,
    lineHeight: 25,
  },
});

export default SelectSeatScreen;
