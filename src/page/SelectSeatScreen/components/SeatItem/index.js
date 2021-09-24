import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import seats from '../../../../assets/images/seat';
import httpConfig from '../../../../api/httpConfig';

export default ({
  icon,
  style,
  iconStyle,
  row,
  column,
  selected,
  onPress,
  status,
  val,
  rowData,
  haveCheckImg,
}) => {
  const disabled = () => {
    if (val) {
      if (val.status === 'Available') {
        return false;
      }
      if (val.status === 'Yellow') {
        return false;
      }
    }
    return true;
  };

  const renderSeat = () => {
    if (!val) {
      return <View style={[styles.icon, iconStyle]} />;
    }
    if (selected) {
      return (
        <Image
          source={
            haveCheckImg
              ? {uri: httpConfig.mediaUrl + haveCheckImg}
              : seats.common05
          }
          style={[styles.icon, iconStyle]}
          resizeMode="contain"
        />
      );
    }
    if (val.status === 'Unavailable') {
      return (
        <Image
          source={val.seatImage === 'common' ? seats.common06 : seats.corona}
          style={[styles.icon, iconStyle]}
          resizeMode="contain"
        />
      );
    }
    if (val.status === 'Locked' || val.status === 'Sold') {
      return (
        <Image
          source={seats.common06}
          style={[styles.icon, iconStyle]}
          resizeMode="contain"
        />
      );
    }
    if (val.status === 'Yellow') {
      return (
        <Image
          source={seats[`${val.seatImage}_Yellow`]}
          style={[styles.icon, iconStyle]}
          resizeMode="contain"
        />
      );
    }

    return (
      <Image
        source={seats[val.seatImage]}
        style={[styles.icon, iconStyle]}
        resizeMode="contain"
      />
    );
  };

  return (
    <TouchableOpacity
      style={[styles.box, style]}
      activeOpacity={0.7}
      onPress={() => onPress(row, column, rowData)}
      disabled={disabled()}>
      {renderSeat()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 25,
    height: 20,
    marginRight: 4,
  },
});
