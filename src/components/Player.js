import React from 'react';
import { StyleSheet, Image } from 'react-native';
import BagImage from '../../assets/game_assets/bags/bag_1.png';

export default function Player() {
  return (
    <Image source={BagImage} style={styles.player}/>
  );
}

const styles = StyleSheet.create({
  container: {
    
  },
  player: {
    width: '50%',
    resizeMode: 'center'
  }
});