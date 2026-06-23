import React, { useEffect, useState } from "react";
import { styles } from "./style";

import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
  StatusBar,
  Alert,
  TextInput,
  Platform
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import Load from "../../components/Load";
import { DrawerActions, useNavigation } from "@react-navigation/core";
import api from "../../../services/api";
import { AnimatedCircularProgress } from "react-native-circular-progress";

import { useIsFocused } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";

export default function Home() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [dados, setDados] = useState([]);
  const [total, setTotal] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState("");
  const [filteredDados, setFilteredDados] = useState([]);
  const [sortAsc, setSortAsc] = useState(true);


async function deletar(id) {

    try {

        await api.get(`appBD/excluir.php?id=${id}`);

        listarDados();
        totalDadosCadastrados();

    } catch (error) {
        console.log(error);
    }

}

  //FUNÇÃO EDITAR E EXCLUIR
  //importar para funcionar a exclusao
  // Platform
  function editarItem(item) {
    navigation.navigate("Cadastro", { id: item.id });
  }

  function excluirItem(id) {
    if (Platform.OS === "web") {
      const confirmar = window.confirm("Deseja excluir este registro?");

      if (confirmar) {
        deletar(id);
      }
    } else {
      Alert.alert("Excluir", "Deseja excluir este registro?", [
        { text: "Cancelar" },
        { text: "Excluir", onPress: () => deletar(id) },
      ]);
    }
  }

  async function totalDadosCadastrados() {
    //MUDAR CAMINHO BD
    const res = await api.get(`appBD/listar-cards.php`);
    setTotal(res.data);
  }

  async function listarDados() {
    try {
      //MUDAR CAMINHO BD
      const res = await api.get(`appBD/buscar.php`);
      setDados(res.data.result);
    } catch (error) {
      console.log("Erro ao Listar " + error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    listarDados();
    totalDadosCadastrados();
  }, [isFocused]);

  const onRefresh = () => {
    setRefreshing(true);
    listarDados();
  };

  //PARA BUSCA DE DADOS NA TABELA QUE MOSTRA OS DADOS DO BD
  useEffect(() => {
    let lista = [...dados];

    // Busca
    if (search !== "") {
      lista = lista.filter(
        (item) =>
          //COLOCAR AQUI OS NOMES DOS STATES QUE SERÃO BUSCADOS NA TABELA
          item.cidade.toLowerCase().includes(search.toLowerCase()) ||
          item.cidade.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setFilteredDados(lista);
  }, [search, dados]);

  //FUNÇÃO PARA ORDENAR OS DADOS TABELA QUE MOSTRA OS DADOS DO BD
  function ordenarPorCidade() {
    let lista = [...filteredDados];

    lista.sort((a, b) => {
      if (sortAsc) {
        //COLOQUE AQUU O STATE QUE SERÁ ORDENADO NA TABELA
        return a.cidade.localeCompare(b.cidade);
      } else {
        return b.cidade.localeCompare(a.cidade);
      }
    });

    setFilteredDados(lista);
    setSortAsc(!sortAsc);
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <View style={styles.containerHeader}>
            <TouchableOpacity
              style={styles.menu}
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            >
              <MaterialIcons name="menu" size={35} color="black" />
            </TouchableOpacity>
            {/* NOME DA IMAGEM DA TELA HOME */}
            <Image
              style={styles.logo}
              source={require("../../../assets/logo2.png")}
            />
          </View>
        </View>

        {isLoading ? (
          <Load />
        ) : (
          <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View style={styles.circleProgressView}>
              <View style={styles.textProgressContainer}>
                <Text style={styles.textProgressTitle}>Tarefas de Hoje</Text>
              </View>

              <AnimatedCircularProgress
                size={80}
                width={8}
                fill={50}
                tintColor="#00e0ff"
                backgroundColor="#e0e0e0"
                lineCap={"round"}
              >
                {(fill) => <Text style={styles.numberInside}>50%</Text>}
              </AnimatedCircularProgress>
            </View>

            <View style={styles.containerBox}>
              {/* COLOCAR O NOME DA TELA QUE SERÁ CHAMADO AO CLICAR EM TAREFAS */}
              <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
                <View>
                  <View style={styles.box}>
                    <MaterialIcons
                      style={styles.iconRegistered}
                      name="lock-clock"
                      size={70}
                      color="#b82d"
                    />
                    <View style={styles.textos}>
                      <Text style={styles.rText}>Total de Registros</Text>
                      <Text style={styles.lenghtText}>
                        {total.total_usuarios}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.textFooter}>Dados Cadastrados</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ padding: 10 }}>
              <TextInput
                placeholder="Buscar cidade ou estado..."
                value={search}
                onChangeText={setSearch}
                style={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  padding: 8,
                  borderRadius: 5,
                }}
              />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View>
                {/* Cabeçalho */}
                <View style={styles.tableHeader}>
                  <Text style={styles.headerCell}>ID</Text>

                  <TouchableOpacity onPress={ordenarPorCidade}>
                    <Text style={styles.headerCell}>Cidade ▲▼</Text>
                  </TouchableOpacity>

                  <Text style={styles.headerCell}>Estado</Text>
                  <Text style={styles.headerCell}>Ações</Text>
                </View>

                {/* Linhas */}
                {filteredDados.map((item, index) => (
                  <View
                    key={item.id}
                    style={[
                      styles.griditem,
                      index % 2 === 0 ? styles.rowEven : styles.rowOdd,
                    ]}
                  >
                    {/* COLOQUE OS STATES QUE SERÃO MOSTRADOS NA TABELA AO LISTAR DO BD */}
                    <Text style={styles.cell}>{item.id}</Text>
                    <Text style={styles.cell}>{item.cidade}</Text>
                    <Text style={styles.cell}>{item.estado}</Text>
                    <View style={styles.actions}>
                      <TouchableOpacity onPress={() => editarItem(item)}>
                        <Ionicons name="create" size={20} color="blue" />
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => excluirItem(item.id)}>
                        <Ionicons name="trash" size={20} color="red" />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
          </ScrollView>
        )}
      </View>
    </View>
  );
}
