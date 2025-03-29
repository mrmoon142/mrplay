import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Stack } from 'expo-router';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(88, 86, 214, 0.8)', 'rgba(120, 86, 214, 0.8)']}
        style={StyleSheet.absoluteFill}
      />
      
      <Stack.Screen options={{ 
        headerShown: true,
        headerStyle: { backgroundColor: 'transparent' },
        headerTintColor: '#fff',
        headerTransparent: true,
        headerBlurEffect: 'dark',
        title: 'About'
      }} />

      <BlurView intensity={20} style={styles.content} tint="dark">
        <ScrollView style={styles.scrollView}>
          <Text style={styles.title}>About MrPlay</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
          
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.text}>
            MrPlay is your personal media player, designed to provide a seamless and enjoyable experience for playing music and videos. With features like playlist management, video creation, and customizable themes, MrPlay puts you in control of your media experience.
          </Text>

          <Text style={styles.sectionTitle}>Features</Text>
          <Text style={styles.text}>
            • Music and video playback{'\n'}
            • Custom playlist creation{'\n'}
            • Video creation tools{'\n'}
            • Equalizer for audio enhancement{'\n'}
            • Customizable themes{'\n'}
            • Personal background images{'\n'}
            • Media library management
          </Text>

          <Text style={styles.sectionTitle}>Contact</Text>
          <Text style={styles.text}>
            For support or inquiries, please contact us at:{'\n'}
            support@mrplay.app
          </Text>
        </ScrollView>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginTop: 100,
  },
  scrollView: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
    color: '#fff',
    marginBottom: 10,
  },
  version: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 24,
  },
});