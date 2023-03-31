import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AccelerometerManager from './AccelerometerManager'
import Constants from 'expo-constants'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CurrencyManager() {
    const [money, setMoney] = useState(0)
    const [moneyMultiplier, setMoneyMultiplier] = useState(1);

    useEffect(() => {
      if (money !== 0) {
        AsyncStorage.setItem('DEMO_APP::MONEY', `${money}`)
      }
    }, [money]);
  
    useEffect(() => {
      
    }, []);

    useEffect(() => {
      const interval = setInterval(() => {
        AsyncStorage.getItem('DEMO_APP::MONEYMULTIPLAIER').then((value) => {
          setMoneyMultiplier(value);
        });

        AsyncStorage.getItem('DEMO_APP::MONEY').then((value) => {
          setMoney(parseFloat(value));
        });
      }, 100);
    
      return () => clearInterval(interval);
      
    }, []);

  function setMoneyCalc(value) {
    setMoney(money + value);
  }

  //Acceleration Values
  return (
    <View style={styles.gameCurrencies}>
      <View >
        <Text>Money: {money.toFixed(2)}{"\n"}</Text>
      </View>
      <AccelerometerManager setMoneyCallback={setMoneyCalc} moneyMultiplier={moneyMultiplier} />
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
