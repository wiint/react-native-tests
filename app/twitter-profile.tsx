import BackButton from '@/components/twitter-profile/back-button';
import Banner from '@/components/twitter-profile/banner';
import Name from '@/components/twitter-profile/name';
import RefreshArrow from '@/components/twitter-profile/refresh-arrow';
import Tweets from '@/components/twitter-profile/tweets';

import { StyleSheet, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

export default function TwitterProfile() {
  const scrollY = useSharedValue(0);

  return (
    <View style={styles.container}>
      <BackButton />

      <RefreshArrow scrollY={scrollY} />

      <Name scrollY={scrollY} />

      <Banner scrollY={scrollY} />

      <Tweets scrollY={scrollY} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
