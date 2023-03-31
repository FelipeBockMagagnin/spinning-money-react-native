import { StyleSheet, View, Text, Button } from 'react-native';
import React, { useEffect } from 'react';
import Player from '../components/Player';
import CurrencyManager from '../components/CurrencyManager';

export default function HomeScreen() {
    return (
      <View style={styles.container}>
        <CurrencyManager />
        <Player/>
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