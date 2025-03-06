import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function BackButton() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        position: 'absolute',
        top: insets.top + 10,
        left: 0,
        right: 0,
        zIndex: 2,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
      }}
    >
      <TouchableOpacity onPress={() => router.back()} style={styles.icon}>
        <Feather name='arrow-left' color='white' size={16} />
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', gap: 8 }}>
        <TouchableOpacity style={styles.icon}>
          <Feather name='search' color='white' size={16} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Feather name='more-horizontal' color='white' size={16} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    height: 32,
    width: 32,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
