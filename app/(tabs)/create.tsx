import { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { Video } from 'expo-av';
import * as ImageManipulator from 'expo-image-manipulator';
import { Camera as CameraIcon, Image as ImageIcon, Save } from 'lucide-react-native';

export default function CreateScreen() {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState(null);
  const cameraRef = useRef(null);

  const startRecording = async () => {
    if (cameraRef.current) {
      setIsRecording(true);
      const video = await cameraRef.current.recordAsync();
      setVideo(video);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (cameraRef.current) {
      cameraRef.current.stopRecording();
    }
  };

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      // Create video from images
      const images = result.assets;
      // Implementation for creating video from images would go here
    }
  };

  const saveVideo = async () => {
    if (video) {
      await MediaLibrary.saveToLibraryAsync(video.uri);
      setVideo(null);
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['rgba(88, 86, 214, 0.8)', 'rgba(120, 86, 214, 0.8)']}
          style={StyleSheet.absoluteFill}
        />
        <BlurView intensity={20} style={styles.content} tint="dark">
          <Text style={styles.permissionText}>
            We need your permission to show the camera
          </Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </BlurView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(88, 86, 214, 0.8)', 'rgba(120, 86, 214, 0.8)']}
        style={StyleSheet.absoluteFill}
      />
      
      <BlurView intensity={20} style={styles.content} tint="dark">
        <Text style={styles.title}>Create Video</Text>

        {video ? (
          <View style={styles.previewContainer}>
            <Video
              source={{ uri: video.uri }}
              style={styles.preview}
              useNativeControls
              resizeMode="contain"
              isLooping
            />
            <View style={styles.previewControls}>
              <TouchableOpacity
                style={styles.previewButton}
                onPress={() => setVideo(null)}>
                <Text style={styles.buttonText}>Retake</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.previewButton} onPress={saveVideo}>
                <Save color="#fff" size={24} />
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            <Camera
              ref={cameraRef}
              style={styles.camera}
              type={type}
              ratio="16:9"
            />
            <View style={styles.controls}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={() =>
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  )
                }>
                <CameraIcon color="#fff" size={24} />
                <Text style={styles.buttonText}>Flip</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.recordButton,
                  isRecording && styles.recordButtonActive,
                ]}
                onPress={isRecording ? stopRecording : startRecording}>
                <View
                  style={[
                    styles.recordButtonInner,
                    isRecording && styles.recordButtonInnerActive,
                  ]}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.controlButton}
                onPress={pickImages}>
                <ImageIcon color="#fff" size={24} />
                <Text style={styles.buttonText}>Gallery</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
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
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
    color: '#fff',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  camera: {
    flex: 1,
    marginBottom: 20,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  controlButton: {
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    marginTop: 8,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 3,
  },
  recordButtonActive: {
    backgroundColor: '#ff0000',
  },
  recordButtonInner: {
    flex: 1,
    borderRadius: 40,
    backgroundColor: '#fff',
  },
  recordButtonInnerActive: {
    backgroundColor: '#ff0000',
  },
  previewContainer: {
    flex: 1,
    marginBottom: 20,
  },
  preview: {
    flex: 1,
  },
  previewControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  previewButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    gap: 10,
  },
  permissionText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Inter_600SemiBold',
  },
  permissionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 10,
  },
  permissionButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Inter_600SemiBold',
  },
});