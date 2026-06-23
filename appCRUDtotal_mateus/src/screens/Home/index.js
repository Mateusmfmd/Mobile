import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import api from '../../services/api';
import Card from '../../components/Card';
import styles from './style';

export default function Home() {
  const [gatos, setGatos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGatos() {
      try {
        const response = await api.get('/listar-cards.php');
        setGatos(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadGatos();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={gatos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Card item={item} />}
      />
    </View>
  );
}
