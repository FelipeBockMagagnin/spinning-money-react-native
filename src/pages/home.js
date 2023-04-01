import { StyleSheet, View, Text, Image, Button, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import Player from '../components/Player';
import CurrencyManager from '../components/CurrencyManager';
import MoneyImage from '../../assets/game_assets/money/Money_1.png';

export default function HomeScreen() {

  return (
    <View style={styles.container}>
      <CurrencyManager />

      <Player />

    </View>

  );
}

const styles = StyleSheet.create({
  container: {

  }
}); 