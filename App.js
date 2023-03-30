import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import Constants from 'expo-constants'
import AccelerometerManager from './src/components/AccelerometerManager'
import Player from './src/components/Player';

export default function App() {

  const [money, setMoney] = useState(0)
  const [moneyMultiplier, setMoneyMultiplier] = useState(1);

  function setMoneyCalc(value) {
    setMoney(money + value);
  }
  //Acceleration Values

  return (
    <View>
      <AccelerometerManager setMoneyCallback={setMoneyCalc} />
      <View style={styles.gameCurrencies}>
        <Text>Money: {money.toFixed(2)}{"\n"}</Text>
      </View>
      
      <Player/>

      <TouchableOpacity>
        <Text>Aa</Text>
      </TouchableOpacity>
    </View>
    
  );
}

const styles = StyleSheet.create({
  gameCurrencies: {
    position: 'absolute',
    left: 10,
    top: Constants.statusBarHeight
  }
}); 
