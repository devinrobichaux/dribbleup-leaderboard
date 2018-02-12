import { StyleSheet } from 'react-native';

module.exports.styles = StyleSheet.create({
    container: {
      flex: 2,
      backgroundColor: '#fff',
      justifyContent: 'center',
    },
    coin: {
      alignSelf: 'flex-end'
    },
    listTitle: {
      fontFamily:'rubik-medium', 
      fontSize: 15, 
      color: 'black'
    },
    listXP: {
      fontFamily:'rubik-medium', 
      fontSize: 12, 
      color: 'black'
    },
    header: { 
      backgroundColor: 'black', 
      paddingTop: 35, 
      paddingBottom: 20, 
      alignItems: 'center' 
    },
    leaderboard: { 
      fontSize: 42, 
      fontFamily: 'rubik-black-italic', 
      color: 'white' 
    } 
  });