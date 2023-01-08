import React, { useEffect } from 'react';
import { useWindowDimensions, ViewProps } from 'react-native';
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  Extrapolate,
  withTiming,
  runOnJS
} from 'react-native-reanimated';

import { useNavigation } from '@react-navigation/core';
import { StackActions } from '@react-navigation/native';

import { AnimationContainer } from './styles';

interface CardAnimationProps extends ViewProps {
  children: React.ReactNode;
}

export function CardAnimation({ children, ...rest }: CardAnimationProps) {
  const { width: displayWidth } = useWindowDimensions();
  const cardOpacity = useSharedValue(0);
  const cardOffset = useSharedValue(0.25 * displayWidth);

  // const navigation = useNavigation();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(cardOpacity.value, [0, 50], [1, 0]),
      transform: [
        {
          translateX: interpolate(cardOffset.value,
            [0, 50],
            [0, -50],
            Extrapolate.CLAMP
          )
        }
      ],

    }
  })

  // function startApp() {
  //   navigation.dispatch(StackActions.replace('Home'));
  // }

  useEffect(() => {
    cardOpacity.value = withTiming(
      1,
      { duration: 1000 },
    );

    cardOffset.value = withTiming(
      0,
      { duration: 1000 },
    );
  }, []);

  return (
    <AnimationContainer {...rest} style={animatedStyle}>
      {children}
    </AnimationContainer>
  )
}