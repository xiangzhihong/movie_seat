import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const Tip = ({
  title,
  contentLeft,
  contentRight,
  contentType = 'body',
  titleType = 'label',
  titleStyle,
  contentStyle,
  style,
  renderIcon,
}) => {
  return (
    <View style={[styles.container, style]}>
      {renderIcon ? renderIcon() : null}
      <Text type={contentType} style={contentStyle}>
        {contentLeft}
        {title ? (
          <Text type={titleType} style={titleStyle}>
            {title}
          </Text>
        ) : null}
        {contentRight}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 6,
  },
});

export default Tip;
