import { ImageBackground, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import {
  HEADER_HEIGHT_EXPANDED,
  HEADER_HEIGHT_NARROWED,
  PROFILE_BANNER_URI,
} from './constants';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

const AnimatedImageBackground =
  Animated.createAnimatedComponent(ImageBackground);

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export default function Banner({ scrollY }: { scrollY: SharedValue<number> }) {
  const imageBackgroundStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: 0,
    right: 0,
    height: HEADER_HEIGHT_EXPANDED + HEADER_HEIGHT_NARROWED,
    transform: [
      {
        scale: interpolate(scrollY.value, [-200, 0], [5, 1], 'clamp'),
      },
    ],
  }));

  const blurViewStyle = useAnimatedStyle(() => ({
    ...StyleSheet.absoluteFillObject,
    zIndex: 2,
    opacity: interpolate(scrollY.value, [-50, 0, 50, 100], [1, 0, 0, 1]),
  }));

  return (
    <AnimatedImageBackground
      source={{
        uri: PROFILE_BANNER_URI,
      }}
      style={imageBackgroundStyle}
    >
      <AnimatedBlurView tint='dark' intensity={96} style={blurViewStyle} />
    </AnimatedImageBackground>
  );
}
