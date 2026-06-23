import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';

import * as ImagePicker from "expo-image-picker";
import { Ionicons } from '@expo/vector-icons';

export default function App() {

  const [image, setImage] = useState(null);

  async function pickImageFromGallery() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result); // Verificar o retorno completo
      setImage(result.assets[0].uri); // Acesse o URI corretamente
    }
  }

  async function takePhoto() {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result); // Verificar o retorno completo
      setImage(result.assets[0].uri); // Acesse o URI corretamente
    }
  }

async function uploadImage() {
  if (!image) return;

  try {
   
    const responseImage = await fetch(image);
    const blob = await responseImage.blob();

    const timestamp = Date.now();
    const random = Math.floor(Math.randon() * 10000)

    const nomeArquivo = foto_${timestamp}_${random}.png
    const formData = new FormData();

    const formData = new FormData();
   
    formData.append('photo', blob, 'foto.png');

    const response = await fetch("http://localhost/PAM2/imagem/upload.php", {
      method: 'POST',
      body: formData,
      
    });

    const result = await response.text();
    console.log("Resposta do PHP:", result);
    Alert.alert("Servidor respondeu", result);

  } catch (error) {
    console.error("Erro detalhado:", error);
    Alert.alert("Erro de Conexão", "O servidor recusou a requisição ou está offline.");
  }
}
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  button: {
    backgroundColor: "#1e90ff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
     borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    minWidth: 180,
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: "#ccc",
  },
});
