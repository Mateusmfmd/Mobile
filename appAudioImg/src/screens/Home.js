import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Player from '../components/Player';
import ListaMusicas from '../components/ListaMusicas';
import { musicas } from '../data/musicas';

export default function Home() {
  const [musicaAtual, setMusicaAtual] = useState(musicas[0]);

  return (
    <View style={styles.container}>
      
      {/* 🎧 PLAYER */}
      <Player
        musica={musicaAtual}
        lista={musicas}
        setMusica={setMusicaAtual}
      />

      {/* 📜 LISTA */}
      <ScrollView>
        <ListaMusicas
          musicas={musicas}
          selecionar={setMusicaAtual}
          atual={musicaAtual}
        />
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  }
});