import React from 'react';
import {View, ScrollView} from 'react-native';
import SelectTimeItem from '../../components/SelectTimeItem';

const SelectTimeContainers = ({times, activeIndex = 0, onPress}) => {
  const onItemPress = (item, index) => {
    onPress && onPress(item, index);
  };
  return (
    <View
      style={{paddingVertical: 10, paddingLeft: 15, backgroundColor: '#fff'}}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {times.map((item, index) => {
          const {activity, bktAmt, cardAmt, minDscAmt, withCardDscAmt} = item;
          let price = cardAmt;
          if (activity === '1') {
            if (cardAmt !== 0) {
              if (minDscAmt < cardAmt && minDscAmt > 0) {
                if (minDscAmt < bktAmt) {
                  price = minDscAmt;
                } else {
                  price = minDscAmt;
                }
              } else {
                price = cardAmt < bktAmt && cardAmt > 0 ? cardAmt : bktAmt;
              }
            } else {
              if (minDscAmt < bktAmt && minDscAmt > 0) {
                price = minDscAmt;
              } else {
                price = bktAmt;
              }
            }
          } else {
            price = cardAmt < bktAmt && cardAmt > 0 ? cardAmt : bktAmt;
          }
          return (
            <SelectTimeItem
              isDisContent={item.activity === '1'}
              info={`￥${price}`}
              key={index}
              onItemPress={() => onItemPress(item, index)}
              isActive={index === activeIndex}
              title={item.scnFrTime}
              content={`${item.movLang}/${item.movType}`}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default SelectTimeContainers;
