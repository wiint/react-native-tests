import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

export default function RefreshArrow({
  scrollY,
}: {
  scrollY: SharedValue<number>;
}) {
  const insets = useSafeAreaInsets();

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [-20, 0], [1, 0]);
    const rotate = interpolate(
      scrollY.value,
      [-45, -35],
      [180, 0],
      Extrapolation.CLAMP
    );

    return {
      zIndex: 2,
      position: 'absolute',
      top: insets.top + 13,
      left: 0,
      right: 0,
      alignItems: 'center',
      opacity,
      transform: [
        {
          rotate: `${rotate}deg`,
        },
      ],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <Feather name='arrow-down' color='white' size={25} />
    </Animated.View>
  );
}
