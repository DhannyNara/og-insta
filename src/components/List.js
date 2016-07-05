const React = require('react');
const { Component, PropTypes } = React;
const ReactNative = require('react-native');
const { ListView } = ReactNative;
const Item = require('./Item');

class List extends Component {
  componentWillMount() {
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
  }

  render() {
    let dataSource = this.dataSource.cloneWithRows(this.props.items);

    return (
      <ListView
        dataSource={dataSource}
        renderRow={(rowData, sectionID, rowID) =>
          <Item
            item={rowData}
            key={rowID}
          />
        }
      />
    );
  }
}

List.propTypes = {
  items: PropTypes.array
};

module.exports = List;
