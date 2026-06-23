import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import api from '../../services/api';
import styles from './style';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [raca, setRaca] = useState('');
  const [idade, setIdade] = useState('');
  const [sexo, setSexo] = useState('');
  const [statusAdocao, setStatusAdocao] = useState('Disponível');
  const [descricao, setDescricao] = useState('');

  async function handleSave() {
    if (!nome || !raca) {
      Alert.alert('Erro', 'Preencha os campos obrigatórios.');
      return;
    }

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('raca', raca);
    formData.append('idade', idade);
    formData.append('sexo', sexo);
    formData.append('status_adocao', statusAdocao);
    formData.append('descricao', descricao);

    try {
      const response = await api.post('/salvar.php', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.data.status === 'sucesso') {
        Alert.alert('Sucesso', 'Gato cadastrado com sucesso!');
        setNome(''); setRaca(''); setIdade(''); setSexo(''); setDescricao('');
      } else {
        Alert.alert('Erro', 'Erro ao salvar.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro na conexão com o servidor.');
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />
      
      <Text style={styles.label}>Raça:</Text>
      <TextInput style={styles.input} value={raca} onChangeText={setRaca} />
      
      <Text style={styles.label}>Idade:</Text>
      <TextInput style={styles.input} value={idade} onChangeText={setIdade} keyboardType="numeric" />
      
      <Text style={styles.label}>Sexo (Macho/Fêmea):</Text>
      <TextInput style={styles.input} value={sexo} onChangeText={setSexo} />
      
      <Text style={styles.label}>Descrição:</Text>
      <TextInput style={styles.input} value={descricao} onChangeText={setDescricao} multiline />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
