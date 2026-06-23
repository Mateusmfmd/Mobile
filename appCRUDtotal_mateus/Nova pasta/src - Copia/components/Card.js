import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = ({ item }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{item.nome}</Text>
      <Text style={styles.info}>Raça: {item.raca}</Text>
      <Text style={styles.info}>Idade: {item.idade} anos</Text>
      <Text style={styles.info}>Sexo: {item.sexo}</Text>
      <Text style={styles.status}>Status: {item.status_adocao}</Text>
      <Text style={styles.description}>{item.descricao}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  info: {
    fontSize: 14,
    color: '#555',
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginTop: 5,
  },
  description: {
    fontSize: 14,
    color: '#777',
    marginTop: 10,
    fontStyle: 'italic',
  },
});

export default Card;
