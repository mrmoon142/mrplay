import { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Audio } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react-native';
import Slider from '@react-native-community/slider';

export default function MusicScreen() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const soundRef = useRef(null);

  const loadSongs = async () => {
    const permission = await MediaLibrary.requestPermissionsAsync();
    if (permission.granted) {
      const media = await MediaLibrary.getAssetsAsync({
        mediaType: 'audio',
      });
      setSongs(media.assets);
    }
  };

  const playSound = async (song) => {
    if (soundRef.current) {
      await soundRef.current.unloadAsync();
    }

    const { sound } = await Audio.Sound.createAsync(
      { uri: song.uri },
      { shouldPlay: true },
      onPlaybackStatusUpdate
    );

    soundRef.current = sound;
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis);
      setIsPlaying(status.isPlaying);
    }
  };

  const togglePlayback = async () => {
    if (soundRef.current) {
      if (isPlaying) {
        await soundRef.current.pauseAsync();
      } else {
        await soundRef.current.playAsync();
      }
    }
  };

  const formatTime = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(88, 86, 214, 0.8)', 'rgba(120, 86, 214, 0.8)']}
        style={StyleSheet.absoluteFill}
      />
      
      <BlurView intensity={20} style={styles.content} tint="dark">
        <Text style={styles.title}>Music Library</Text>
        
        <ScrollView style={styles.songList}>
          {songs.map((song) => (
            <TouchableOpacity
              key={song.id}
              style={styles.songItem}
              onPress={() => playSound(song)}>
              <Image source={{ uri: song.albumCover }} style={styles.albumCover} />
              <View style={styles.songInfo}>
                <Text style={styles.songTitle}>{song.filename}</Text>
                <Text style={styles.songArtist}>{song.artist || 'Unknown Artist'}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {currentSong && (
          <BlurView intensity={30} style={styles.player} tint="dark">
            <View style={styles.nowPlaying}>
              <Image
                source={{ uri: currentSong.albumCover }}
                style={styles.currentAlbumCover}
              />
              <View style={styles.songDetails}>
                <Text style={styles.currentSongTitle}>{currentSong.filename}</Text>
                <Text style={styles.currentSongArtist}>
                  {currentSong.artist || 'Unknown Artist'}
                </Text>
              </View>
            </View>

            <Slider
              style={styles.progressBar}
              value={position}
              maximumValue={duration}
              minimumTrackTintColor="#fff"
              maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
              thumbTintColor="#fff"
              onSlidingComplete={(value) => {
                if (soundRef.current) {
                  soundRef.current.setPositionAsync(value);
                }
              }}
            />

            <View style={styles.timeInfo}>
              <Text style={styles.timeText}>{formatTime(position)}</Text>
              <Text style={styles.timeText}>{formatTime(duration)}</Text>
            </View>

            <View style={styles.controls}>
              <TouchableOpacity style={styles.controlButton}>
                <SkipBack color="#fff" size={24} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.controlButton, styles.playButton]}
                onPress={togglePlayback}>
                {isPlaying ? (
                  <Pause color="#fff" size={32} />
                ) : (
                  <Play color="#fff" size={32} />
                )}
              </TouchableOpacity>
              <TouchableOpacity style={styles.controlButton}>
                <SkipForward color="#fff" size={24} />
              </TouchableOpacity>
            </View>

            <View style={styles.volumeControl}>
              <Volume2 color="#fff" size={20} />
              <Slider
                style={styles.volumeSlider}
                value={volume}
                onValueChange={setVolume}
                minimumTrackTintColor="#fff"
                maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
                thumbTintColor="#fff"
              />
            </View>
          </BlurView>
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
  songList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  albumCover: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  songInfo: {
    marginLeft: 15,
  },
  songTitle: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  songArtist: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  player: {
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  nowPlaying: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  currentAlbumCover: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  songDetails: {
    marginLeft: 15,
  },
  currentSongTitle: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
  },
  currentSongArtist: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  progressBar: {
    width: '100%',
    height: 40,
  },
  timeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -10,
  },
  timeText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  controlButton: {
    padding: 10,
    marginHorizontal: 20,
  },
  playButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 30,
    padding: 15,
  },
  volumeControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  volumeSlider: {
    flex: 1,
    marginLeft: 10,
  },
});