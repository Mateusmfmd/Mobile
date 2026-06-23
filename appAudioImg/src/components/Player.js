import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';

export default function Player({ musica, lista, setMusica }) {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(1);
  const [volume, setVolume] = useState(1);

  //carregar música
  useEffect(() => {
    async function loadSound() {
      if (sound) {
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        musica.arquivo,
        { shouldPlay: true, volume: volume },
        onPlaybackStatusUpdate
      );

      setSound(newSound);
      setIsPlaying(true);
    }

    loadSound();
  }, [musica]);

  // atualizar 
  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis || 1);
      setIsPlaying(status.isPlaying);
    }
  };


  const playPause = async () => {
    if (!sound) return;

    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  };

  //  próxima musica
  const proxima = () => {
    const index = lista.findIndex(m => m.id === musica.id);
    const next = lista[(index + 1) % lista.length];
    setMusica(next);
  };

  // musica anterior
  const anterior = () => {
    const index = lista.findIndex(m => m.id === musica.id);
    const prev = index === 0 ? lista[lista.length - 1] : lista[index - 1];
    setMusica(prev);
  };


  const seek = async (value) => {
    if (sound) {
      await sound.setPositionAsync(value);
    }
  };

  // volume
  const changeVolume = async (value) => {
    setVolume(value);
    if (sound) {
      await sound.setVolumeAsync(value);
    }
  };

  // limpar memória
  useEffect(() => {
    return () => {
      if (sound) sound.unloadAsync();
    };
  }, [sound]);

  // mostra tempo
  const formatTime = (millis) => {
    const totalSec = Math.floor(millis / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <View style={styles.container}>

      {/*  CAPA */}
      <Image source={musica.capa} style={styles.capa} />

      {/* Título */}
      <Text style={styles.titulo}>{musica.titulo}</Text>

      {/* slide da barra de carregamento usica */}
      <Slider
        style={{ width: '100%' }}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        onSlidingComplete={seek}
      />

      <View style={styles.tempo}>
        <Text style={styles.texto}>{formatTime(position)}</Text>
        <Text style={styles.texto}>{formatTime(duration)}</Text>
      </View>

      {/* Controles mudar musicas*/}
      <View style={styles.controls}>
        <TouchableOpacity onPress={anterior}>
          <Text style={styles.btn}>⏮️</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={playPause}>
          <Text style={styles.play}>
            {isPlaying ? '⏸️' : '▶️'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={proxima}>
          <Text style={styles.btn}>⏭️</Text>
        </TouchableOpacity>
      </View>

      {/* 🔊 Volume */}
      <View style={{ marginTop: 20 }}>
        <Text style={styles.texto}>Volume</Text>
        <Slider
          minimumValue={0}
          maximumValue={1}
          value={volume}
          onValueChange={changeVolume}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    padding: 20,
    borderRadius: 20,
    margin: 10,
    alignItems: 'center'
  },
  capa: {
    width: 250,
    height: 250,
    borderRadius: 15,
    marginBottom: 15
  },
  titulo: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 10
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 15,
    alignItems: 'center'
  },
  btn: {
    fontSize: 30,
    color: '#fff'
  },
  play: {
    fontSize: 40,
    color: '#1DB954'
  },
  tempo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  texto: {
    color: '#fff'
  }
});