import React from 'react';
import { StyleSheet, View } from 'react-native';
import Player from './src/components/Player';
import CurrencyManager from './src/components/CurrencyManager';

export default function App() {
  return (
    <View style={styles.container}>
      <CurrencyManager />
      <Player />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
}); 
