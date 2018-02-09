import React from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { List, ListItem, ButtonGroup, Text } from 'react-native-elements';
import axios from 'axios';
import _ from 'lodash';



export default class App extends React.Component {

  state = {
    data: [],
    filter: 0,
  }
  
  componentWillMount() {
    axios.get('http://dusoccer.dribbleup.com/sampleAPI/')
      .then((res) => {
        // console.log(res.data.leaderboard);
        this.setState({ data: res.data.leaderboard });
      })
  }

  renderHeader() {
    return (
        <View colors={[, '#1da2c6', '#1695b7']}
            style={{ backgroundColor: '#119abf', padding: 15, paddingTop: 35, alignItems: 'center' }}>
            <Text style={{ fontSize: 25, color: 'white', }}>AllStars</Text>
            <View style={{
                flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                marginBottom: 15, marginTop: 20
            }}>
            </View>
            <ButtonGroup
                onPress={(x) => { console.log(x) }}
                selectedIndex={this.state.filter}
                buttons={['This Week', 'All Time']}
                containerStyle={{ height: 30 }} />
        </View>
    )
}

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white'}}>
      {this.renderHeader()}
        <ScrollView>
          <List containerStyle={{marginBottom: 20}}>
            {
              this.state.data.map((user, i) => (
                <ListItem
                  key={i}
                  title={user.username}
                  rightIcon={
                      <Image source={require('./assets/DUcoin.png')} style={styles.ratingImage}/>
                  }
                />
              ))
            }
          </List>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  ratingImage: {
    alignSelf: 'flex-end'
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey'
  }
});
