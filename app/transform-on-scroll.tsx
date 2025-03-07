import { Dimensions, StyleSheet, Text } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const stories = [
  { id: '1', color: 'red' },
  { id: '2', color: 'blue' },
  { id: '3', color: 'green' },
  { id: '4', color: 'purple' },
];

const StoryItem = ({ item, index, scrollX }: any) => {
  const insects = useSafeAreaInsets();

  const offset = index * width;
  const inputRange = [offset - width, offset + width];
  const angle = 90;

  const animatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(
      scrollX.value,
      inputRange,
      [angle, -angle],
      Extrapolation.CLAMP
    );
    const shift = offset <= scrollX.value ? width / 2 : -width / 2;

    return {
      transform: [
        { perspective: width / 0.5 },
        { translateX: shift },
        { rotateY: `${rotateY}deg` },
        { translateX: -shift },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        styles.storyItem,
        {
          height: height - insects.top - insects.bottom,
          backgroundColor: item.color,
        },
        animatedStyle,
      ]}
    >
      <Text style={styles.text}>Story {item.id}</Text>
    </Animated.View>
  );
};

const StoryView = () => {
  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  return (
    <SafeAreaView>
      <Animated.FlatList
        data={stories}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => (
          <StoryItem item={item} index={index} scrollX={scrollX} />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  storyItem: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 50,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default StoryView;
