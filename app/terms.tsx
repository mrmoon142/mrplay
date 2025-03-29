import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Stack } from 'expo-router';

export default function TermsScreen() {
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
        title: 'Terms & Conditions'
      }} />

      <BlurView intensity={20} style={styles.content} tint="dark">
        <ScrollView style={styles.scrollView}>
          <Text style={styles.title}>Terms & Conditions</Text>
          <Text style={styles.lastUpdated}>Last updated: January 2024</Text>

          <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
          <Text style={styles.text}>
            By downloading and using MrPlay, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not use our application.
          </Text>

          <Text style={styles.sectionTitle}>2. Use License</Text>
          <Text style={styles.text}>
            Permission is granted to use MrPlay for personal, non-commercial purposes. This license does not include:{'\n\n'}
            • Modifying or copying the application{'\n'}
            • Using the application for commercial purposes{'\n'}
            • Attempting to decompile or reverse engineer the application{'\n'}
            • Removing any copyright or proprietary notations
          </Text>

          <Text style={styles.sectionTitle}>3. Media Usage</Text>
          <Text style={styles.text}>
            You are responsible for all media content accessed and created through MrPlay. Ensure you have the necessary rights to use any media content.
          </Text>

          <Text style={styles.sectionTitle}>4. Disclaimer</Text>
          <Text style={styles.text}>
            MrPlay is provided "as is" without any warranties, expressed or implied. We do not warrant that the application will be error-free or uninterrupted.
          </Text>

          <Text style={styles.sectionTitle}>5. Contact</Text>
          <Text style={styles.text}>
            Questions about these Terms & Conditions should be sent to: terms@mrplay.app
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