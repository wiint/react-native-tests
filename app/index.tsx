import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomePage() {
  return (
    <SafeAreaView style={styles.container}>
      <Link href='/twitter-profile'>Twitter Profile</Link>
      <Link href='/collapsible-tab-view-test'>
        react-native-collapsible-tab-view
      </Link>
      <Link href='/transform-on-scroll'>transform-test</Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
});
