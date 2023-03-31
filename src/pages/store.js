import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import CurrencyManager from '../components/CurrencyManager';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Store() {
    const [moneyMultiplaier, setMoneyMultiplaier] = useState(1);
    const [moneyMultiplierPrice, setMoneyMultiplierPrice] = useState(10);

    useEffect(() => {
        if (moneyMultiplaier !== 1) {
            AsyncStorage.setItem('DEMO_APP::MONEYMULTIPLAIER', `${moneyMultiplaier}`)
        }

        if (moneyMultiplierPrice !== 10) {
            AsyncStorage.setItem('DEMO_APP::MONEYMULTIPLAIERPRICE', `${moneyMultiplierPrice}`)
        }
    }, [moneyMultiplaier, moneyMultiplierPrice]);

    useEffect(() => {
        console.log('get value')
        AsyncStorage.getItem('DEMO_APP::MONEYMULTIPLAIER').then((value) => {
            setMoneyMultiplaier(parseFloat(value));
        });

        AsyncStorage.getItem('DEMO_APP::MONEYMULTIPLAIERPRICE').then((value) => {
            setMoneyMultiplierPrice(parseFloat(value));
        });
    }, []);

    function buyMoneyMulti(){
        AsyncStorage.getItem('DEMO_APP::MONEY').then((money) => {
            if(money < moneyMultiplierPrice){
                alert('You don\'t have money');
                return false;
            }
            AsyncStorage.setItem('DEMO_APP::MONEY', `${money - moneyMultiplierPrice}`);
            setMoneyMultiplaier(moneyMultiplaier + 1);
            setMoneyMultiplierPrice(moneyMultiplierPrice * 2)
        }); 
    }

    return (
        <View>
            <CurrencyManager />
            <View style={styles.container}>
                <Text>Money Multiplier: {moneyMultiplaier}</Text>
                <Button title={'Buy Cost: ' + moneyMultiplierPrice + '$'} onPress={() => buyMoneyMulti()} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        height: '100%'
    }
}); 
