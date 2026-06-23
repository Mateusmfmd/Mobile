import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function ListaMusicas({ musicas, selecionar, atual }) {
  return (
    <View style={styles.container}>
      {musicas.map((m) => (
        <TouchableOpacity
          key={m.id}
          style={[
            styles.item,
            atual.id === m.id && styles.ativo
          ]}
          onPress={() => selecionar(m)}
        >
          <Image source={m.capa} style={styles.capa} />

          <Text style={styles.titulo}>
            {m.titulo}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#333'
  },
  ativo: {
    backgroundColor: '#1DB95433'
  },
  capa: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10
  },
  titulo: {
    color: '#fff'
  }
});