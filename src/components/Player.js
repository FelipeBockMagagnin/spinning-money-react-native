import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import BagImage from '../../assets/game_assets/bags/bag_1.png';

export default function Player() {
  return (
    <View style={styles.container}>
      <Image source={BagImage}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100
  },
}); 
