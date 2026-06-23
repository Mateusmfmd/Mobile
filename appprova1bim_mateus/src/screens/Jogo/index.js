

import React, { useState, useEffect } from 'react';
import { ScrollView,Alert, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import {  useNavigation } from '@react-navigation/core';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { styles } from './style';
import { showMessage, hideMessage } from "react-native-flash-message";

import api from '../../../services/api';


const Jogo= () => {
   
  
   
    const [nome_jogo, setnome_jogo] = useState("");   
    const [lancamento, setlancamento] = useState("");   
    const [categoria, setcategoria] = useState("");
    const [nota_jogo, setnota_jogo] = useState("");
    const [sucess, setSucess] = useState(false);
  
   
    async function saveData() {            
       
          if (nome_jogo == "" || lancamento == "" || categoria == "" || nota_jogo == "") {  
        showMessage({  
            message: "Erro ao Salvar",  
            description: "Preencha os Campos Obrigatórios!",  
            type: "warning",  
        });  
        return;  
    }  

        try {
            const obj = {

                
            
                atributo1: nome_jogo,               
                atributo2: lancamento,
                atributo3: categoria,        
                atributo4: nota_jogo, 
            }

            //SUBSTITUA O CAMINHO PELO CAMINHO AONDE ESTA SEU ARQUIVO NO XAMPP
            const res = await api.post('provamateus/salvar.php', obj);

            if (res.data.sucesso === false) {
                showMessage({
                    message: "Erro ao Salvar",
                    description: res.data.mensagem,
                    type: "warning",
                    duration: 3000,
                });               
                return;
            }

            setSucess(true);
            showMessage({
                message: "Salvo com Sucesso",
                description: "Registro Salvo",
                type: "success",
                duration: 800,             
            });          
          
        } catch (error) {
            Alert.alert("Ops", "Alguma coisa deu errado, tente novamente.");
            setSucess(false);
        }
    }      

    
    

    return (
        <View style={{ flex: 1, marginTop: 20, backgroundColor: '#D0D0D0',  }}>
            <View style={styles.Header}>

                {/* SUBSTITUA O NOME DA IMAGEM LOGO2 PELO NOME DA SUA IMAGEM- NÃO ESQUEÇA DE COLOCAR A IMAGEM NA PASTA ASSETS */}
                 <Image style={styles.logo} source={require('../../../assets/joystick-logo-for-gaming-icon-illustration-vector.jpg')} />          
                           

            </View>

            <View style={styles.Title}>

                {/*SUBSTIUA O NOME contract-outline PELO NOME DO ICONE QUE VOCÊ BUSCOU NO SITE ION ICONS */}
                     <Ionicons name="clipboard-outline" size={35} color="#484a4d" />
                        <Text style={styles.TitleText}>CADASTRAR Jogos </Text>
                    </View>



             <ScrollView>   
            <View>  
                {/*MUDE OS DADOS PELO SEU PRIMEIRO ATRIBUTO */}

                <Text style={styles.TitleInputs}>nome jogo</Text>

                <TextInput               
                    placeholder="Nome do jogo escolhido"
                    onChangeText={(text) => setnome_jogo(text)}
                    value={nome_jogo}
                    style={styles.TextInput}
                />
            </View>


            <View>
                {/*MUDE OS DADOS PELO SEU SEGUNDO ATRIBUTO */}

                <Text style={styles.TitleInputs}>lancamento</Text>
                <TextInput
                    placeholder="Data do Lançamento do jogo"
                    onChangeText={(text) => setlancamento(text)}
                    value={lancamento}
                    style={styles.TextInput}
                   
                />
            </View>

          
            <View>
                 {/*MUDE OS DADOS PELO SEU TERCEIRO ATRIBUTO */}

                <Text style={styles.TitleInputs}>categoria</Text>

                <TextInput
                    placeholder="Categoria do jogo"
                    onChangeText={(text) => setcategoria(text)}
                    value={categoria}
                    style={styles.TextInput}
                   
                />
            </View>

            <View>
                 {/*MUDE OS DADOS PELO SEU QUARTO ATRIBUTO */}

                <Text style={styles.TitleInputs}>nota jogo</Text>

                <TextInput
                    placeholder="De sua nota de 0 a 10"
                    onChangeText={(text) => setnota_jogo(text)}
                    value={nota_jogo}
                    style={styles.TextInput}
                   
                />
            </View>
                       
                  
                <TouchableOpacity
                    style={styles.Button}
                    onPress={() => {
                        setSucess(true);
                        saveData();
                        setSucess(false);
                    }}
                >
                     {/*SUBSTIUA O NOME save-outline PELO NOME DO ICONE QUE VOCÊ BUSCOU NO SITE ION ICONS */}
                     <Ionicons name="checkmark-outline" size={35} color="#FFF" />
                    <Text style={styles.ButtonText}>Salvar cadastro</Text>
                </TouchableOpacity>

                </ScrollView>                 

        </View>
    );
}

export default Jogo;