import { Text, StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Name({ scrollY }: { scrollY: SharedValue<number> }) {
  const insets = useSafeAreaInsets();

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [90, 110], [0, 1]),
    transform: [
      {
        translateY: interpolate(scrollY.value, [90, 120], [30, 0], 'clamp'),
      },
    ],
  }));

  return (
    <Animated.View
      style={[
        {
          zIndex: 2,
          position: 'absolute',
          top: insets.top + 6,
          left: 60,
          right: 0,
          alignItems: 'flex-start',
        },
        animatedStyle,
      ]}
    >
      <Text style={[styles.text, styles.username]}>React Native</Text>

      <Text style={[styles.text, styles.tweetsCount]}>714 posts</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: -3,
  },
  tweetsCount: {
    fontSize: 13,
  },
});
