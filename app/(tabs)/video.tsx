import { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Video } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';
import { Play, Pause, Volume2 } from 'lucide-react-native';
import Slider from '@react-native-community/slider';

export default function VideoScreen() {
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [status, setStatus] = useState({});
  const videoRef = useRef(null);

  const loadVideos = async () => {
    const permission = await MediaLibrary.requestPermissionsAsync();
    if (permission.granted) {
      const media = await MediaLibrary.getAssetsAsync({
        mediaType: 'video',
      });
      setVideos(media.assets);
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    setStatus(status);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(88, 86, 214, 0.8)', 'rgba(120, 86, 214, 0.8)']}
        style={StyleSheet.absoluteFill}
      />
      
      <BlurView intensity={20} style={styles.content} tint="dark">
        <Text style={styles.title}>Video Library</Text>

        {currentVideo ? (
          <View style={styles.videoPlayer}>
            <Video
              ref={videoRef}
              style={styles.video}
              source={{ uri: currentVideo.uri }}
              useNativeControls
              resizeMode="contain"
              isLooping
              onPlaybackStatusUpdate={onPlaybackStatusUpdate}
            />
            <View style={styles.videoControls}>
              <TouchableOpacity
                style={styles.playButton}
                onPress={() => {
                  status.isPlaying
                    ? videoRef.current.pauseAsync()
                    : videoRef.current.playAsync();
                }}>
                {status.isPlaying ? (
                  <Pause color="#fff" size={24} />
                ) : (
                  <Play color="#fff" size={24} />
                )}
              </TouchableOpacity>
              <View style={styles.volumeControl}>
                <Volume2 color="#fff" size={20} />
                <Slider
                  style={styles.volumeSlider}
                  value={status.volume || 1}
                  onValueChange={async (value) => {
                    await videoRef.current.setVolumeAsync(value);
                  }}
                  minimumTrackTintColor="#fff"
                  maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
                  thumbTintColor="#fff"
                />
              </View>
            </View>
          </View>
        ) : (
          <ScrollView style={styles.videoList}>
            {videos.map((video) => (
              <TouchableOpacity
                key={video.id}
                style={styles.videoItem}
                onPress={() => setCurrentVideo(video)}>
                <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
                <View style={styles.videoInfo}>
                  <Text style={styles.videoTitle}>{video.filename}</Text>
                  <Text style={styles.videoDuration}>
                    {Math.floor(video.duration / 60)}:{(video.duration % 60)
                      .toString()
                      .padStart(2, '0')}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
  videoList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  videoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  thumbnail: {
    width: 120,
    height: 80,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  videoInfo: {
    flex: 1,
    marginLeft: 15,
  },
  videoTitle: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  videoDuration: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
  },
  videoPlayer: {
    flex: 1,
    backgroundColor: '#000',
  },
  video: {
    flex: 1,
  },
  videoControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  playButton: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    marginRight: 15,
  },
  volumeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  volumeSlider: {
    flex: 1,
    marginLeft: 10,
  },
});