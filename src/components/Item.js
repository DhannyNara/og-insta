const React = require('react');
const { PropTypes } = React;
const ReactNative = require('react-native');
const { View, Text } = ReactNative;

const Item = function Item(props) {
  return (
    <View>
      <Text>
        {props.item.txt}
      </Text>
    </View>
  );
};

Item.propTypes = {
  item: PropTypes.object
};

module.exports = Item;
