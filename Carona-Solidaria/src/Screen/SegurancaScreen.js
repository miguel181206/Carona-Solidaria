import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity, Switch, Alert } from 'react-native';
import Header from '../Components/Header';
import { styles } from '../Styles/styles';
import { useLocation } from '../Utils/useLocation';
import { loadProfile, saveProfile } from '../storage/profile';

const PLACEHOLDER_ICON = 'https://via.placeholder.com/30';

const SegurancaScreen = ({ navigation }) => {
  const [rastreamentoAtivo, setRastreamentoAtivo] = useState(false);
  const [compartilharLocalizacao, setCompartilharLocalizacao] = useState(false);
  const { location, startLocationUpdates, stopLocationUpdates, requestPermission } = useLocation();
  const [contatosSOS, setContatosSOS] = useState([]);

  useEffect(() => {
    (async () => {
      const profile = await loadProfile();
      if (profile?.contatosSOS) {
        setContatosSOS(profile.contatosSOS);
      }
      if (profile?.rastreamentoAtivo) {
        setRastreamentoAtivo(profile.rastreamentoAtivo);
      }
      if (profile?.compartilharLocalizacao) {
        setCompartilharLocalizacao(profile.compartilharLocalizacao);
      }
    })();
  }, []);

  useEffect(() => {
    if (rastreamentoAtivo && compartilharLocalizacao) {
      startLocationUpdates();
    } else {
      stopLocationUpdates();
    }
    return () => stopLocationUpdates();
  }, [rastreamentoAtivo, compartilharLocalizacao]);

  const toggleRastreamento = async (value) => {
    if (value) {
      const hasPermission = await requestPermission();
      if (!hasPermission) {
        Alert.alert('Permissão necessária', 'É necessário permitir acesso à localização para ativar o rastreamento.');
        return;
      }
    }
    setRastreamentoAtivo(value);
    const profile = await loadProfile();
    await saveProfile({ ...profile, rastreamentoAtivo: value });
  };

  const toggleCompartilharLocalizacao = async (value) => {
    if (value) {
      const hasPermission = await requestPermission();
      if (!hasPermission) {
        Alert.alert('Permissão necessária', 'É necessário permitir acesso à localização para compartilhar.');
        return;
      }
    }
    setCompartilharLocalizacao(value);
    const profile = await loadProfile();
    await saveProfile({ ...profile, compartilharLocalizacao: value });
  };

  return (
    <SafeAreaView style={styles.container} accessible={true} accessibilityLabel="Tela de segurança">
      <Header navigation={navigation} title="Segurança" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nossas Medidas de Segurança</Text>
          <View style={styles.securityFeatures}>
            <View style={styles.feature} accessible={true} accessibilityRole="text">
              <Text style={styles.featureIcon}>🔒</Text>
              <Text style={styles.featureTitle}>Verificação Rigorosa</Text>
              <Text style={styles.featureDescription}>Motoristas passam por validação de documentos e entrevista.</Text>
            </View>
            <View style={styles.feature} accessible={true} accessibilityRole="text">
              <Text style={styles.featureIcon}>📍</Text>
              <Text style={styles.featureTitle}>Rastreamento em Tempo Real</Text>
              <Text style={styles.featureDescription}>Rotas podem ser compartilhadas com contatos de confiança.</Text>
            </View>
            <View style={styles.feature} accessible={true} accessibilityRole="text">
              <Text style={styles.featureIcon}>🚨</Text>
              <Text style={styles.featureTitle}>Botão SOS</Text>
              <Text style={styles.featureDescription}>Acesso rápido a ajuda durante a viagem.</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configurações de Segurança</Text>
          
          <View style={styles.switchContainer} accessible={true} accessibilityRole="switch" accessibilityState={{ checked: rastreamentoAtivo }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.switchLabel}>Rastreamento Ativo</Text>
              <Text style={[styles.switchLabel, { fontSize: 12, color: '#666', marginTop: 5 }]}>
                Sua localização será atualizada automaticamente durante as viagens
              </Text>
            </View>
            <Switch
              value={rastreamentoAtivo}
              onValueChange={toggleRastreamento}
              thumbColor={rastreamentoAtivo ? '#9f3458' : '#f4f3f4'}
              trackColor={{ false: '#767577', true: '#f8bbd0' }}
              accessibilityLabel="Ativar rastreamento de localização"
            />
          </View>

          <View style={styles.switchContainer} accessible={true} accessibilityRole="switch" accessibilityState={{ checked: compartilharLocalizacao }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.switchLabel}>Compartilhar Localização</Text>
              <Text style={[styles.switchLabel, { fontSize: 12, color: '#666', marginTop: 5 }]}>
                Permite compartilhar localização com contatos SOS
              </Text>
            </View>
            <Switch
              value={compartilharLocalizacao}
              onValueChange={toggleCompartilharLocalizacao}
              thumbColor={compartilharLocalizacao ? '#9f3458' : '#f4f3f4'}
              trackColor={{ false: '#767577', true: '#f8bbd0' }}
              accessibilityLabel="Compartilhar localização com contatos SOS"
            />
          </View>

          {location && (
            <View style={styles.statusCard} accessible={true} accessibilityRole="text">
              <Text style={styles.statusTitle}>Localização Atual</Text>
              <Text style={styles.statusText}>
                Latitude: {location.latitude.toFixed(6)}
              </Text>
              <Text style={styles.statusText}>
                Longitude: {location.longitude.toFixed(6)}
              </Text>
              <Text style={[styles.statusText, { fontSize: 12, color: '#666' }]}>
                Atualizado: {new Date(location.timestamp).toLocaleTimeString()}
              </Text>
            </View>
          )}

          <View style={styles.sectionSubtitle}>
            <Text style={styles.sectionSubtitle}>Contatos SOS Configurados</Text>
            {contatosSOS.length > 0 ? (
              contatosSOS.map((contato, idx) => (
                <View key={idx} style={styles.contactItem} accessible={true} accessibilityRole="text">
                  <Text style={styles.contactText}>{contato.nome}</Text>
                  <Text style={[styles.contactText, { fontSize: 12, color: '#666' }]}>{contato.telefone}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>Nenhum contato SOS configurado</Text>
            )}
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Perfil')}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Ir para perfil para configurar contatos SOS"
            >
              <Text style={styles.buttonText}>Configurar Contatos SOS</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Políticas de Segurança</Text>
          <View style={styles.policyContent}>
            <View style={styles.policyItem} accessible={true} accessibilityRole="text">
              <Text style={styles.policyTitle}>Dados Protegidos</Text>
              <Text style={styles.policyDescription}>
                Todas as informações pessoais são criptografadas e armazenadas de forma segura.
              </Text>
            </View>
            <View style={styles.policyItem} accessible={true} accessibilityRole="text">
              <Text style={styles.policyTitle}>Denúncia</Text>
              <Text style={styles.policyDescription}>
                Em caso de comportamento inadequado, você pode denunciar diretamente pelo aplicativo.
              </Text>
            </View>
            <View style={styles.policyItem} accessible={true} accessibilityRole="text">
              <Text style={styles.policyTitle}>Suporte 24/7</Text>
              <Text style={styles.policyDescription}>
                Nossa equipe está disponível para ajudar em qualquer situação de emergência.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SegurancaScreen;

