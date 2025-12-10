import React from 'react';
import { SafeAreaView, ScrollView, View, Text } from 'react-native';
import Header from '../Components/Header';
import { styles } from '../Styles/styles';

const ComoFuncionaScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} title="Como Funciona" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Como Funciona</Text>
          <View style={styles.stepsContainer}>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <Text style={styles.stepTitle}>Cadastre-se</Text>
              <Text style={styles.stepDescription}>Crie seu perfil com documentos verificados.</Text>
            </View>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <Text style={styles.stepTitle}>Solicite sua carona</Text>
              <Text style={styles.stepDescription}>Escolha se quer apenas motoristas mulheres.</Text>
            </View>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <Text style={styles.stepTitle}>Confirme e acompanhe</Text>
              <Text style={styles.stepDescription}>Confirme a motorista e acompanhe o tempo estimado.</Text>
            </View>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>4</Text>
              </View>
              <Text style={styles.stepTitle}>Avalie e gorjete</Text>
              <Text style={styles.stepDescription}>Ao fim, avalie e, se quiser, ofereça gorjeta (opcional).</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ComoFuncionaScreen;

