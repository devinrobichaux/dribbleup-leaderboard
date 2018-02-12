import React from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { List, ListItem, ButtonGroup, Text } from 'react-native-elements';
import axios from 'axios';
import _ from 'lodash';
import { Font } from 'expo';
import { styles } from './Styles.js';

export default class App extends React.Component {

  state = {
    data: [],
    filter: 0,
    fontLoaded: false
  }

  componentWillMount() {
    axios.get('http://dusoccer.dribbleup.com/sampleAPI/')
      .then((res) => {
        this.setState({ data: res.data.leaderboard });
      })
      .catch((err) => {
        if (err) throw err;
      })
  }

  async componentDidMount() {
    await Font.loadAsync({
      'rubik-black-italic': require('./assets/fonts/Rubik-BlackItalic.ttf'),
      'rubik-medium': require('./assets/fonts/Rubik-Medium.ttf')
    });
    this.setState({ fontLoaded: true });
  }

  renderHeader() {
    return (
      <View
        style={styles.header}>
        {
          this.state.fontLoaded ? (
            <Text h1 style={styles.leaderboard}>
              Leaderboard
            </Text>
          ) : null
        }
        <ButtonGroup
          onPress={(x) => { this.setState({ filter: x }) }}
          selectedIndex={this.state.filter}
          buttons={['All Time', 'This Week']}
          containerStyle={{ height: 30 }}
        />
      </View>
    )
  }

  render() {

    const sortedData = this.state.filter > 0 ?
      _.orderBy(this.state.data, ['value'], ['desc']) :
      _.orderBy(this.state.data, ['userXP'], ['desc'])

    return (
      <View style={{ flex: 1 }}>
        {this.renderHeader()}
        <ScrollView>
          {
            sortedData.map((user, i) => (
              <ListItem
                key={i}
                title={`${i + 1}: ${user.username}`}
                titleStyle={styles.listTitle}
                containerStyle={{ backgroundColor: (i === 0 ? 'gold' : i % 2 === 1 ? '#ECEEEC' : '#F7F7F7') }}
                rightIcon={
                  <Image source={require('./assets/images/DUcoin.png')} style={styles.coin} />
                }
                rightTitle={
                  this.state.filter === 0 ? `Total XP: ${user.userXP}` : `Weekly XP: ${user.value}`
                }
                rightTitleStyle={styles.listXP}
              />
            ))
          }
        </ScrollView>
      </View>
    );
  }
}

