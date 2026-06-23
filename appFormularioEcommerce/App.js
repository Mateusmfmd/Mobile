import React, { useState } from 'react';
import {
  StyleSheet, Text, View, TextInput,
  Dimensions, ScrollView, TouchableOpacity
} from 'react-native';

import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

const { width } = Dimensions.get('window');
const FRETE = 20.00;

export default function App() {
  const [nome, setNome]             = useState('');
  const [cpf, setCpf]               = useState('');
  const [telefone, setTelefone]     = useState('');
  const [email, setEmail]           = useState('');
  const [endereco, setEndereco]     = useState('');
  const [produto, setProduto]       = useState(0);
  const [quantidade, setQuantidade] = useState(1);
  const [grau, setGrau]             = useState(0);
  const [pagamento, setPagamento]   = useState(0);

  const produtos = [
    { nome: 'Minoxidil 5%',         preco: 89.90  },
    { nome: 'Shampoo Antiqueda',     preco: 49.90  },
    { nome: 'Serum Capilar',         preco: 129.90 },
    { nome: 'Finasterida Natural',   preco: 99.90  },
    { nome: 'Kit Completo Calvície', preco: 299.90 },
  ];

  const graus = [
    'Grau I – Entradas leves',
    'Grau II – Entradas moderadas',
    'Grau III – Topo descoberto',
    'Grau IV – Área ampla sem cabelo',
    'Grau V – Calvície avançada',
    'Grau VI – Calvície severa',
    'Grau VII – Calvície total',
  ];

  const pagamentos = ['Cartão de Crédito', 'Cartão de Débito', 'PIX', 'Boleto Bancário'];

  const subtotal = produtos[produto].preco * quantidade;
  const total    = (subtotal + FRETE).toFixed(2);

  const mascaraCPF = (t) => {
    let c = t.replace(/\D/g, '').slice(0, 11);
    if (c.length > 9) return c.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
    if (c.length > 6) return c.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
    if (c.length > 3) return c.replace(/(\d{3})(\d{0,3})/, '$1.$2');
    return c;
  };

  const mascaraTel = (t) => {
    let c = t.replace(/\D/g, '');
    if (c.length > 10) return c.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    if (c.length > 6)  return c.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    if (c.length > 2)  return c.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    return c;
  };

  function finalizar() {
    if (!nome || !cpf || !telefone || !email || !endereco) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }
    alert(
      '✅ Pedido realizado!\n\n' +
      'Nome: '       + nome + '\n' +
      'CPF: '        + cpf + '\n' +
      'Telefone: '   + telefone + '\n' +
      'E-mail: '     + email + '\n' +
      'Endereço: '   + endereco + '\n\n' +
      'Produto: '    + produtos[produto].nome + '\n' +
      'Quantidade: ' + quantidade + ' un.\n' +
      'Grau: '       + graus[grau] + '\n' +
      'Pagamento: '  + pagamentos[pagamento] + '\n\n' +
      'Subtotal: R$ '+ subtotal.toFixed(2) + '\n' +
      'Frete: R$ '   + FRETE.toFixed(2) + '\n' +
      'Total: R$ '   + total
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.tela} showsVerticalScrollIndicator={false}>

      {/* Cabeçalho */}
      <View style={styles.cabecalho}>
        <Text style={styles.logo}> Manuel</Text>
        <Text style={styles.subtitulo}>Especialistas em Calvície</Text>
      </View>

      {/* Formulário */}
      <View style={styles.formulario}>

        <Text style={styles.secao}>Dados Pessoais</Text>

        <Text style={styles.label}>Nome completo</Text>
        <TextInput style={styles.input} placeholder="Digite seu nome"
          onChangeText={setNome} />

        <Text style={styles.label}>CPF</Text>
        <TextInput style={styles.input} placeholder="000.000.000-00"
          keyboardType="numeric" value={cpf} maxLength={14}
          onChangeText={(t) => setCpf(mascaraCPF(t))} />

        <Text style={styles.label}>Telefone</Text>
        <TextInput style={styles.input} placeholder="(99) 99999-9999"
          keyboardType="numeric" value={telefone} maxLength={15}
          onChangeText={(t) => setTelefone(mascaraTel(t))} />

        <Text style={styles.label}>E-mail</Text>
        <TextInput style={styles.input} placeholder="seu@email.com"
          keyboardType="email-address" autoCapitalize="none"
          onChangeText={setEmail} />

        <Text style={styles.label}>Endereço</Text>
        <TextInput style={[styles.input, styles.inputGrande]}
          placeholder="Rua, número, bairro, cidade – UF"
          multiline numberOfLines={2} onChangeText={setEndereco} />

        {/* Produto */}
        <View style={styles.divisor} />
        <Text style={styles.secao}>Produto</Text>

        <Text style={styles.label}>Escolha o produto</Text>
        <View style={styles.pickerBox}>
          <Picker selectedValue={produto} onValueChange={setProduto}>
            {produtos.map((p, i) => <Picker.Item key={i} value={i} label={p.nome} />)}
          </Picker>
        </View>

        <View style={styles.linha}>
          <Text style={styles.label}>Preço unitário:</Text>
          <Text style={styles.destaque}>R$ {produtos[produto].preco.toFixed(2)}</Text>
        </View>

        <Text style={styles.label}>
          Quantidade: <Text style={styles.destaque}>{quantidade} un.</Text>
        </Text>
        <Slider
          minimumValue={1} maximumValue={10} step={1}
          value={quantidade} onValueChange={setQuantidade}
          minimumTrackTintColor="#8B4513"
          maximumTrackTintColor="#ccc"
          thumbTintColor="#8B4513"
        />
        <View style={styles.linha}>
          <Text style={styles.labelPequeno}>1 un.</Text>
          <Text style={styles.labelPequeno}>10 un.</Text>
        </View>

        {/* Calvície */}
        <View style={styles.divisor} />
        <Text style={styles.secao}>Grau de Calvície</Text>

        <View style={styles.pickerBox}>
          <Picker selectedValue={grau} onValueChange={setGrau}>
            {graus.map((g, i) => <Picker.Item key={i} value={i} label={g} />)}
          </Picker>
        </View>

        {/* Pagamento */}
        <View style={styles.divisor} />
        <Text style={styles.secao}>Forma de Pagamento</Text>

        <View style={styles.pickerBox}>
          <Picker selectedValue={pagamento} onValueChange={setPagamento}>
            {pagamentos.map((p, i) => <Picker.Item key={i} value={i} label={p} />)}
          </Picker>
        </View>

        {/* Resumo */}
        <View style={styles.divisor} />
        <Text style={styles.secao}>Resumo</Text>

        <View style={styles.resumo}>
          <View style={styles.linha}>
            <Text style={styles.label}>Subtotal</Text>
            <Text style={styles.label}>R$ {subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.linha}>
            <Text style={styles.label}>Frete fixo</Text>
            <Text style={styles.label}>R$ {FRETE.toFixed(2)}</Text>
          </View>
          <View style={styles.divisorFino} />
          <View style={styles.linha}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValor}>R$ {total}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.botao} onPress={finalizar}>
          <Text style={styles.botaoTexto}>Finalizar Pedido</Text>
        </TouchableOpacity>

        <Text style={styles.rodape}>🔒 Compra segura • Entrega em até 5 dias úteis</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flexGrow: 1,
    backgroundColor: '#f5f0eb',
    alignItems: 'center',
    paddingVertical: 30,
  },
  cabecalho: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5C3317',
  },
  subtitulo: {
    fontSize: 14,
    color: '#8B6347',
    marginTop: 4,
  },
  formulario: {
    width: width * 0.9,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  secao: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5C3317',
    marginTop: 4,
  },
  label: {
    fontSize: 14,
    color: '#444',
    marginTop: 4,
  },
  labelPequeno: {
    fontSize: 12,
    color: '#999',
  },
  destaque: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#fafafa',
    color: '#222',
  },
  inputGrande: {
    height: 65,
    textAlignVertical: 'top',
  },
  pickerBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fafafa',
    overflow: 'hidden',
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divisor: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 6,
  },
  divisorFino: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 4,
  },
  resumo: {
    backgroundColor: '#fdf6f0',
    borderRadius: 10,
    padding: 14,
    gap: 6,
    borderWidth: 1,
    borderColor: '#e8d5c4',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValor: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5C3317',
  },
  botao: {
    backgroundColor: '#8B4513',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 6,
  },
  botaoTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  rodape: {
    textAlign: 'center',
    fontSize: 12,
    color: '#aaa',
    marginTop: 4,
  },
});