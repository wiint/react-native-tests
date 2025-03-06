import { Image, StyleSheet, Text, View } from 'react-native';

import Animated, {
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {
  HEADER_HEIGHT_EXPANDED,
  HEADER_HEIGHT_NARROWED,
  PROFILE_PICTURE_URI,
} from './constants';
import generateTweets from './utils';

const TWEETS = generateTweets(30);

export default function Tweets({ scrollY }: { scrollY: SharedValue<number> }) {
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y;
  });

  const profilePicStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          scrollY.value,
          [0, HEADER_HEIGHT_EXPANDED],
          [1, 0.6],
          'clamp'
        ),
      },
      {
        translateY: interpolate(
          scrollY.value,
          [0, HEADER_HEIGHT_EXPANDED],
          [0, 16],
          'clamp'
        ),
      },
    ],
  }));

  return (
    <Animated.ScrollView
      showsVerticalScrollIndicator={false}
      onScroll={onScroll}
      style={{
        zIndex: 3,
        marginTop: HEADER_HEIGHT_NARROWED,
        paddingTop: HEADER_HEIGHT_EXPANDED,
      }}
    >
      <View style={[styles.container, { backgroundColor: 'black' }]}>
        <View
          style={[
            styles.container,
            {
              paddingHorizontal: 20,
            },
          ]}
        >
          <Animated.Image
            source={{
              uri: PROFILE_PICTURE_URI,
            }}
            style={[
              {
                width: 75,
                height: 75,
                borderRadius: 40,
                borderWidth: 4,
                borderColor: 'black',
                marginTop: -30,
              },
              profilePicStyle,
            ]}
          />

          <Text
            style={[
              styles.text,
              {
                fontSize: 24,
                fontWeight: 'bold',
                marginTop: 10,
              },
            ]}
          >
            React Native
          </Text>

          <Text
            style={[
              styles.text,
              {
                fontSize: 15,
                color: 'gray',
                marginBottom: 15,
              },
            ]}
          >
            @reactnative
          </Text>

          <Text style={[styles.text, { marginBottom: 15, fontSize: 15 }]}>
            The official React Native Twitter account.
          </Text>

          {/* Profile stats */}
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 15,
            }}
          >
            <Text
              style={[
                styles.text,
                {
                  fontWeight: 'bold',
                  marginRight: 10,
                },
              ]}
            >
              45{' '}
              <Text
                style={{
                  color: 'gray',
                  fontWeight: 'normal',
                }}
              >
                Following
              </Text>
            </Text>

            <Text style={[styles.text, { fontWeight: 'bold' }]}>
              216.1K{' '}
              <Text
                style={{
                  color: 'gray',
                  fontWeight: 'normal',
                }}
              >
                Followers
              </Text>
            </Text>
          </View>
        </View>

        <View style={styles.container}>
          {TWEETS.map((item, index) => (
            <View key={item.key} style={styles.tweet}>
              <Image
                source={{
                  uri: PROFILE_PICTURE_URI,
                }}
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 25,
                  marginRight: 10,
                }}
              />

              <View style={styles.container}>
                <Text
                  style={[
                    styles.text,
                    {
                      fontWeight: 'bold',
                      fontSize: 15,
                    },
                  ]}
                >
                  {item.author}{' '}
                  <Text
                    style={{
                      color: 'gray',
                      fontWeight: 'normal',
                    }}
                  >
                    @{item.tag} · {index + 1}d
                  </Text>
                </Text>

                <Text style={[styles.text, { fontSize: 15 }]}>{item.text}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: 'white',
  },
  tweet: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255, 255, 255, 0.25)',
  },
});
