import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Stack } from 'expo-router';

export default function PrivacyScreen() {
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
        title: 'Privacy Policy'
      }} />

      <BlurView intensity={20} style={styles.content} tint="dark">
        <ScrollView style={styles.scrollView}>
          <Text style={styles.title}>Privacy Policy</Text>
          <Text style={styles.lastUpdated}>Last updated: January 2024</Text>

          <Text style={styles.sectionTitle}>1. Information We Collect</Text>
          <Text style={styles.text}>
            MrPlay is designed to respect your privacy. We only access media files and storage when explicitly granted permission by you. We do not collect or store any personal information beyond what is necessary for the app to function.
          </Text>

          <Text style={styles.sectionTitle}>2. Media Access</Text>
          <Text style={styles.text}>
            • We request access to your device's media library to play music and videos{'\n'}
            • Camera access is requested for video creation features{'\n'}
            • Storage access is needed to save created videos
          </Text>

          <Text style={styles.sectionTitle}>3. Data Storage</Text>
          <Text style={styles.text}>
            All your media files and playlists are stored locally on your device. We do not upload or store any of your media files on external servers.
          </Text>

          <Text style={styles.sectionTitle}>4. Third-Party Services</Text>
          <Text style={styles.text}>
            MrPlay does not integrate with any third-party services that would collect or process your data.
          </Text>

          <Text style={styles.sectionTitle}>5. Contact Us</Text>
          <Text style={styles.text}>
            If you have any questions about this Privacy Policy, please contact us at privacy@mrplay.app
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
  lastUpdated: {
    fontSize: 14,
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