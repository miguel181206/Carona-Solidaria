import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../Components/Header';
import { styles } from '../Styles/styles';
import { loadHistory, clearHistory } from '../storage/history';

const HistoricoScreen = ({ navigation }) => {
  const [historico, setHistorico] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const data = await loadHistory();
        setHistorico(data);
      })();
    }, [])
  );

  const limparHistorico = async () => {
    await clearHistory();
    setHistorico([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} title="Histórico" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Histórico de Viagens</Text>
          {historico.length > 0 && (
            <TouchableOpacity style={[styles.button, { marginBottom: 15 }]} onPress={limparHistorico}>
              <Text style={styles.buttonText}>Limpar histórico</Text>
            </TouchableOpacity>
          )}
          {historico.length === 0 ? (
            <Text style={styles.emptyText}>Você ainda não tem viagens registradas.</Text>
          ) : (
            historico.map((item) => (
              <View key={item.id} style={styles.historyCard}>
                <Text style={styles.historyTitle}>{item.destino}</Text>
                <Text style={styles.historyInfo}>Origem: {item.origem}</Text>
                <Text style={styles.historyInfo}>Motorista: {item.motorista} • {item.carro}</Text>
                {item.localizacao && (
                  <Text style={styles.historyInfo}>Localização: {item.localizacao}</Text>
                )}
                <Text style={styles.historyStatus}>
                  {item.status}
                  {item.gorjeta ? ` • Gorjeta R$ ${item.gorjeta.toFixed(2)}` : ''}
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HistoricoScreen;

