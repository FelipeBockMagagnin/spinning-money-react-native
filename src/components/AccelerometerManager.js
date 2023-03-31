import Constants from 'expo-constants';
import { Accelerometer } from 'expo-sensors';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function AccelerometerManager({ setMoneyCallback, moneyMultiplier }) {
  //Acceleration Values
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [{ lastX, lastY, lastZ }, setLastData] = useState({
    lastX: 0,
    lastY: 0,
    lastZ: 0,
  });

  const [difference, setDifference] = useState(0);
  const [subscription, setSubscription] = useState(null);

  //Game consts
  const isDebug = false;

  useEffect(() => {
    const currentDifferenceX = x - lastX;
    const currentDifferenceY = y - lastY;
    const currentDifferenceZ = z - lastZ;

    let sumValue = 0;

    sumValue += currentDifferenceX > 0.1 ? currentDifferenceX : 0;
    sumValue += currentDifferenceY > 0.1 ? currentDifferenceY : 0;
    sumValue += currentDifferenceZ > 0.1 ? currentDifferenceZ : 0;
    sumValue *= moneyMultiplier;

    setLastData({
      lastX: x,
      lastY: y,
      lastZ: z,
    });

    setDifference(sumValue);
    setMoneyCallback(sumValue);
  }, [x, y, z]);

  const _subscribe = () => {
    setSubscription(Accelerometer.addListener(setData));
    Accelerometer.setUpdateInterval(200);
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  if(!isDebug) return;

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.text}>
          Debug = x: {x.toFixed(2)}, y: {y.toFixed(2)}, z: {z.toFixed(2)}
        </Text>
        <Text>Difference: {difference.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
  },
  button: {
    width: '50%',
    backgroundColor: 'blue',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    color: 'white',
  },
  textButton: {
    color: 'white',
    fontSize: 20,
  },
  gameCurrencies: {
    position: 'absolute',
    left: 10,
    top: Constants.statusBarHeight,
  },
});
