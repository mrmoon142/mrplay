import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

export default function HomeScreen() {
  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop' }}
      style={styles.container}>
      <LinearGradient
        colors={['rgba(88, 86, 214, 0.8)', 'rgba(120, 86, 214, 0.8)']}
        style={StyleSheet.absoluteFill}
      />
      <BlurView intensity={20} style={styles.content} tint="dark">
        <Text style={styles.title}>Welcome to MrPlay</Text>
        <Text style={styles.subtitle}>Your Personal Media Player</Text>
      </BlurView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
});