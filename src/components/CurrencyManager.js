import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AccelerometerManager from './AccelerometerManager'
import Constants from 'expo-constants'

export default function CurrencyManager() {
  const [money, setMoney] = useState(0)

  function setMoneyCalc(value) {
    setMoney(money + value);
  }
  //Acceleration Values
  return (
    <View style={styles.gameCurrencies}>
      <View >
        <Text>Money: {money.toFixed(2)}{"\n"}</Text>
      </View>
      <AccelerometerManager setMoneyCallback={setMoneyCalc} />
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
