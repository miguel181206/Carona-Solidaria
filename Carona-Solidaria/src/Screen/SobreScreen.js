import React from 'react';
import { SafeAreaView, ScrollView, View, Text, Image } from 'react-native';
import Header from '../Components/Header';
import { styles } from '../Styles/styles';

const SobreScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} title="Sobre" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobre o Carona Solidária</Text>
          <View style={styles.aboutContent}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=300&fit=crop' }}
              style={styles.sectionImage}
            />
            <View style={styles.aboutText}>
              <Text style={styles.paragraph}>
                O Carona Solidária apoia mulheres docentes e estudantes do SENAI que precisam voltar em segurança, sem custo obrigatório.
              </Text>
              <Text style={styles.paragraph}>
                Criamos uma rede de confiança com motoristas verificadas, opção de selecionar apenas mulheres e botão de SOS integrado.
              </Text>
              <View style={styles.stats}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>100%</Text>
                  <Text style={styles.statLabel}>Motoristas verificadas</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>24/7</Text>
                  <Text style={styles.statLabel}>SOS disponível</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>500+</Text>
                  <Text style={styles.statLabel}>Usuárias cadastradas</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SobreScreen;

