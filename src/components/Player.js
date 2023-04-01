import React from 'react';
import { StyleSheet, Image, Text, View, Animated, Easing } from 'react-native';
import BagImage from '../../assets/game_assets/bags/bag_1.png';

import { DeviceMotion } from 'expo-sensors';

class Player extends React.Component {

  state = {
    motionX: 0,
    motionY: 0,
    motionZ: 0
  }

  transformValue = {
    X: new Animated.Value(0),
    Y: new Animated.Value(0)
  }
  cardTransform = {
    X: '0deg',
    Y: '0deg'
  }

  componentDidMount() {

    DeviceMotion.isAvailableAsync()
      .then(available => {
        if (available) {

          this.setState({ motionAvailable: true });

          DeviceMotion.addListener(responder => {
            this.setState({
              motionX: responder.rotation?.alpha,
              motionY: responder.rotation?.beta,
              motionZ: responder.rotation?.gamma
            })
          });

        }
      });
  }

  componentDidUpdate(prevProps, prevState) {
    // limits parallax tilt
    const rotateValue = (motion) => {
      let limit = motion * 100;

      if (Math.abs(limit) > 20) // limit to 20deg
        limit = limit > 0 ? 20 : -20

      return Math.floor(limit);
    }

    // update animation values
    const imgRotateXPrev = rotateValue(prevState.motionY / 2); // divide by 2 to limit parallax on X axis
    const imgRotateYPrev = rotateValue(prevState.motionZ);

    const imgRotateX = rotateValue(this.state.motionY / 2);
    const imgRotateY = rotateValue(this.state.motionZ);

    this.cardTransform.X = this.transformValue.X.interpolate({ inputRange: [0, 1], outputRange: [imgRotateXPrev + 'deg', imgRotateX + 'deg'] });
    this.cardTransform.Y = this.transformValue.Y.interpolate({ inputRange: [0, 1], outputRange: [imgRotateYPrev + 'deg', imgRotateY + 'deg'] });

    // animation start
    this.transformValue.X.setValue(0);
    this.transformValue.Y.setValue(0);

    Animated.timing(this.transformValue.X, { toValue: 1, duration: 100, easing: Easing.linear, useNativeDriver: true }).start();
    Animated.timing(this.transformValue.Y, { toValue: 1, duration: 100, easing: Easing.linear, useNativeDriver: true }).start();

  }

  render() {

    return (
      <View style={imageStyles.container}>
        <Animated.Image
          source={BagImage}
          style={[imageStyles.image, {
            transform: [
              { rotateX: this.cardTransform.X },
              { rotateY: this.cardTransform.Y }
            ]
          }]} />
      </View>
    )
  }
}

const styles = {
  container: {
    alignItems: 'center'
  }
}

const imageStyles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  image: {
    width: '70%',
    resizeMode: 'center'
  }
}

export default Player;