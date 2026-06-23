
import  {useEffect, useState, useRef } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image, Dimensions, SafeAreaView, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function App() {
  const [imagens, setImagens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modoPrincipal, setModoPrincipal] = useState('carrossel');
  

  const carouselRef = useRef(null);

  useEffect(() => {
    async function carregarImagens() {
      try {
        const response = await fetch('http://localhost/PAM2/imagem/listar_imagens.php');
        const data = await response.json();
        setImagens(data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    }
    carregarImagens();
  }, []);

 
  const focarImagem = (index) => {
  
    setModoPrincipal('carrossel');
    

    setTimeout(() => {
      carouselRef.current?.scrollTo({ index, animated: true });
    }, 100);
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#4ae282" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
    <Text style={styles.header}>🐾 Pets Desaparecidos</Text>

           <View style={styles.navBar}>
        <TouchableOpacity 
          style={[styles.navButton, modoPrincipal === 'carrossel' && styles.navActive]}
          onPress={() => setModoPrincipal('carrossel')}
        >
          <Ionicons name="images" size={18} color="#fff" />
          <Text style={styles.navText}>Procurados</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navButton, modoPrincipal === 'grade' && styles.navActive]}
          onPress={() => setModoPrincipal('grade')}
        >
          <Ionicons name="grid" size={18} color="#fff" />
          <Text style={styles.navText}>Ver Desaparecidos</Text>
        </TouchableOpacity>
      </View>

      <ScrollView stickyHeaderIndices={[0]}>

        <View style={styles.mainContainer}>
          {modoPrincipal === 'carrossel' ? (
            <Carousel
              ref={carouselRef}
              loop={false}
              width={width}
              height={300}
              data={imagens}
              renderItem={({ item }) => (
                <View style={styles.carouselSlide}>
                  <Image source={{ uri: item.url || item }} style={styles.imgFull} />
                  <Text style={styles.labelFull}>{item.split('/').pop()}</Text>
                </View>
              )}
            />
          ) : (
            <FlatList
              data={imagens}
              numColumns={3}
              scrollEnabled={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity 
                  style={styles.touchableGrade} 
                  onPress={() => focarImagem(index)} 
                >
                  <Image source={{ uri: item.url || item }} style={styles.imgGrid} />
                </TouchableOpacity>
              )}
            />
          )}
        </View>

       
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: 
  {
    flex: 1,
    backgroundColor: '#000' 
  },
  header: 
  { 
    fontSize: 18,
    color: '#fff', 
    textAlign: 'center', 
    fontWeight: 'bold', 
    marginVertical: 15 
  },  
  navBar: 
  { 
    flexDirection: 'row', 
    justifyContent: 'center',
     gap: 12, 
     marginBottom: 15
  },
  navButton: 
  { 
    flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: '#1A1A1A', 
    padding: 12,
    borderRadius: 10,
    gap: 8 
  },
  navActive: 
  { 
    backgroundColor: '#4ae261' 
  },
  navText:
  {
     color: '#fff', 
     fontSize: 13,
     fontWeight: 'bold' 
  },
  mainContainer: 
  { 
    minHeight: 320, 
    backgroundColor: '#000'
  },
  carouselSlide:
  { 
    alignItems: 'center'
  },
  imgFull: 
  { 
    width: width * 0.9, 
    height: 260, 
    borderRadius: 20, 
    backgroundColor: '#111'
  },
  labelFull: 
  { color: '#666', 
    marginTop: 10, 
    fontSize: 12 
  },  
  touchableGrade: 
  { 
    flex: 1,
    aspectRatio: 1,
    margin: 4
  },
  imgGrid: 
  { width: '100%', 
    height: '100%', 
    borderRadius: 8 
  },
  footerList: 
  { 
    padding: 15, 
    borderTopWidth: 1, 
    borderTopColor: '#1A1A1A' 
  },
  footerTitle: 
  { 
    color: '#13f60b', 
    fontSize: 11, 
    letterSpacing: 1, 
    fontWeight: '900', 
    marginBottom: 15
  },
    miniButton: 
  { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#cc1010', 
    padding: 10, 
    borderRadius: 15, 
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#020202'
  },
  miniImg: 
  { 
    width: 50, 
    height: 50, 
    borderRadius: 25 
  },
  miniInfo: 
  { 
    flex: 1, 
    marginLeft: 15 
  },
  miniName:
   { 
    color: '#FFF', 
    fontSize: 14, 
    fontWeight: '600'
  },
  loading: 
  { 
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#000'
  }
});