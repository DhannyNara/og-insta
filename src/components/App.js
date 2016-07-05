const React = require('react');
const Component = React.Component;
const shittyQs = require('shitty-qs');
const { StyleSheet, Text, View, Linking } = require('react-native');
// https://github.com/jasonmerino/react-native-simple-store
const store = require('react-native-simple-store');
const List = require('./List');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

/*eslint-disable */
function rNInstagramOAuth(clientId, redirectUrl, callback) {
  Linking.addEventListener('url', handleUrl);
  console.log('added event listenener');
  function handleUrl (event) {
    console.log('handleUrl');
    var [, query_string] = event.url.match(/\#(.*)/);
    var query = shittyQs(query_string);
    if (query.access_token !== undefined) {
      callback(null, query.access_token);
    } else {
      callback(new Error('Oauth2 security error'));
    }

    Linking.removeEventListener('url', handleUrl);
  }

  Linking.openURL(`https://api.instagram.com/oauth/authorize/?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=token`);
}
/*eslint-enable */

class App extends Component {
  static getInstagramByMyself(accessToken) {
    fetch(`https://api.instagram.com/v1/users/self/?access_token=${accessToken}`)
      .then((response) => response.json()).then((responseData) => {
        console.log('response data from IG...');
        console.log(responseData);

        const data = responseData.data;
        const userInfo = {
          id: data.id,
          bio: data.bio,
          counts: {
            followedBy: data.followed_by,
            follows: data.follows,
            media: data.media
          },
          fullName: data.full_name,
          profilePicture: data.profile_picture,
          userName: data.username,
          website: data.website
        };

        this.setState({ UserInfo: userInfo });
        store.save('UserInfo', userInfo);
      });
  }

  static loginCallback(err, accessToken) {
    console.log('im here inside loginc callback');

    if (err) {
      console.log('error is..');
      console.log(err);
    }

    if (accessToken !== undefined) {
      console.log(accessToken);
      console.log('login: accessToken !== undefined');
      this.getInstagramByMyself(accessToken);
    }
  }

  static login(clientId, redirectUrl) {
    console.log('inside login!!');
    rNInstagramOAuth(clientId, redirectUrl, App.loginCallback.bind(this));
  }

  static getPostsData() {
    console.log('getting posts data <3');
  }

  constructor() {
    super();
    // 'instagram://app'
    this.instagram = {
      client_id: '3911744c523648ce866181b26d3fe2d6',
      redirect_url: 'ig3911744c523648ce866181b26d3fe2d6://authorize'
    };

    this.getPostsData = App.getPostsData.bind(this);
    this.login = App.login.bind(this);
    this.getInstagramByMyself = App.getInstagramByMyself.bind(this);

    this.state = {
      items: [
        { txt: 'Learn react native', complete: false },
        { txt: 'Make a to-do app', complete: true }
      ]
    };
  }

  componentDidMount() {
    this.getPostsData();
    this.login(this.instagram.client_id, this.instagram.redirect_url);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>
          og-insta
        </Text>
        <List items={this.state.items} />
      </View>
    );
  }
}

module.exports = App;
