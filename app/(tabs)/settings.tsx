import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { User, Moon, Sun, Image as ImageIcon, Shield, FileText, Info } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { Link } from 'expo-router';

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });

    if (!result.canceled) {
      setBackgroundImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {backgroundImage ? (
        <Image source={{ uri: backgroundImage }} style={StyleSheet.absoluteFill} />
      ) : (
        <LinearGradient
          colors={['rgba(88, 86, 214, 0.8)', 'rgba(120, 86, 214, 0.8)']}
          style={StyleSheet.absoluteFill}
        />
      )}
      
      <BlurView intensity={20} style={styles.content} tint="dark">
        <Text style={styles.title}>Settings</Text>

        <View style={styles.section}>
          <View style={styles.settingItem}>
            <View style={styles.settingHeader}>
              {darkMode ? <Moon color="#fff" size={24} /> : <Sun color="#fff" size={24} />}
              <Text style={styles.settingTitle}>Dark Mode</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={darkMode ? '#f5dd4b' : '#f4f3f4'}
            />
          </View>

          <TouchableOpacity style={styles.settingItem} onPress={pickImage}>
            <View style={styles.settingHeader}>
              <ImageIcon color="#fff" size={24} />
              <Text style={styles.settingTitle}>Change Background</Text>
            </View>
          </TouchableOpacity>

          <Link href="/about" asChild>
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingHeader}>
                <Info color="#fff" size={24} />
                <Text style={styles.settingTitle}>About</Text>
              </View>
            </TouchableOpacity>
          </Link>

          <Link href="/privacy" asChild>
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingHeader}>
                <Shield color="#fff" size={24} />
                <Text style={styles.settingTitle}>Privacy Policy</Text>
              </View>
            </TouchableOpacity>
          </Link>

          <Link href="/terms" asChild>
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingHeader}>
                <FileText color="#fff" size={24} />
                <Text style={styles.settingTitle}>Terms & Conditions</Text>
              </View>
            </TouchableOpacity>
          </Link>
        </View>
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
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
    color: '#fff',
    marginBottom: 20,
  },
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  settingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#fff',
  },
});