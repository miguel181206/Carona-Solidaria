import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import Header from '../Components/Header';
import { styles } from '../Styles/styles';
import { loadProfile, saveProfile } from '../storage/profile';
import { saveHistory, loadHistory, clearHistory } from '../storage/history';
import { logout, getCurrentUser } from '../storage/auth';

const DEFAULT_PROFILE = {
  nome: 'Usuária',
  email: 'usuario@exemplo.com',
  tipo: 'passageiro',
  foto: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
};

const PerfilScreen = ({ navigation }) => {
  const [perfil, setPerfil] = useState(DEFAULT_PROFILE);
  const [contatos, setContatos] = useState([
    { nome: 'Emergência 190', telefone: '190', tipo: 'telefone' },
    { nome: 'Contato Familiar', telefone: '+5541999999999', tipo: 'whatsapp' },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const saved = await loadProfile();
      if (saved) setPerfil(saved);
      const savedHist = await loadHistory();
      const first = savedHist?.[0]?.contatosSOS;
      if (first) setContatos(first);
      const user = await getCurrentUser();
      if (user) {
        setPerfil(prev => ({ ...prev, ...user }));
      }
    })();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      const ok = await saveProfile({ ...perfil, contatosSOS: contatos });
      const hist = await loadHistory();
      const updatedHist = (hist || []).map((h) => ({ ...h, contatosSOS: contatos }));
      await saveHistory(updatedHist);
      if (ok) {
        Alert.alert('Sucesso', 'Perfil salvo localmente.');
      } else {
        Alert.alert('Erro', 'Não foi possível salvar seu perfil.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao salvar o perfil.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Confirmar Logout',
      'Tem certeza que deseja sair? Todos os dados locais serão mantidos.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              const success = await logout();
              if (success) {
                Alert.alert('Logout realizado', 'Você foi desconectado com sucesso.', [
                  {
                    text: 'OK',
                    onPress: () => {
                      // Resetar para tela inicial ou tela de login
                      navigation.reset({
                        index: 0,
                        routes: [{ name: 'Início' }],
                      });
                    },
                  },
                ]);
              } else {
                Alert.alert('Erro', 'Não foi possível realizar o logout.');
              }
            } catch (error) {
              Alert.alert('Erro', 'Ocorreu um erro ao fazer logout.');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} accessible={true} accessibilityLabel="Tela de perfil do usuário">
      <Header navigation={navigation} title="Meu Perfil" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.profileInfo} accessible={true} accessibilityRole="text">
            <Image 
              source={{ uri: perfil.foto }} 
              style={styles.profileImg}
              accessible={true}
              accessibilityLabel={`Foto de perfil de ${perfil.nome}`}
            />
            <Text style={styles.profileName} accessibilityRole="text">{perfil.nome}</Text>
            <Text style={styles.profileEmail} accessibilityRole="text">{perfil.email}</Text>
            <Text style={styles.profileType} accessibilityRole="text">
              {perfil.tipo === 'motorista' ? 'Motorista' : 'Passageiro'}
            </Text>
          </View>

          <Text style={styles.label} accessible={true} accessibilityRole="text">Nome</Text>
          <TextInput 
            style={styles.input} 
            value={perfil.nome} 
            onChangeText={(v) => setPerfil({ ...perfil, nome: v })}
            accessible={true}
            accessibilityLabel="Campo de nome"
            accessibilityHint="Digite seu nome"
            placeholderTextColor="#999"
          />

          <Text style={styles.label} accessible={true} accessibilityRole="text">E-mail</Text>
          <TextInput
            style={styles.input}
            value={perfil.email}
            onChangeText={(v) => setPerfil({ ...perfil, email: v })}
            keyboardType="email-address"
            accessible={true}
            accessibilityLabel="Campo de e-mail"
            accessibilityHint="Digite seu e-mail"
            placeholderTextColor="#999"
          />

          <Text style={styles.label} accessible={true} accessibilityRole="text">Tipo</Text>
          <TextInput
            style={styles.input}
            value={perfil.tipo}
            onChangeText={(v) => setPerfil({ ...perfil, tipo: v })}
            placeholder="passageiro ou motorista"
            accessible={true}
            accessibilityLabel="Campo de tipo de usuário"
            accessibilityHint="Digite passageiro ou motorista"
            placeholderTextColor="#999"
          />

        <Text style={[styles.label, { marginTop: 10 }]} accessible={true} accessibilityRole="text">Contatos SOS</Text>
        {contatos.map((c, idx) => (
          <View key={idx} style={{ marginBottom: 10 }} accessible={true} accessibilityRole="text">
            <TextInput
              style={styles.input}
              value={c.nome}
              onChangeText={(v) => {
                const arr = [...contatos];
                arr[idx] = { ...arr[idx], nome: v };
                setContatos(arr);
              }}
              placeholder="Nome do contato"
              accessible={true}
              accessibilityLabel={`Nome do contato SOS ${idx + 1}`}
              placeholderTextColor="#999"
            />
            <TextInput
              style={styles.input}
              value={c.telefone}
              onChangeText={(v) => {
                const arr = [...contatos];
                arr[idx] = { ...arr[idx], telefone: v };
                setContatos(arr);
              }}
              placeholder="Telefone/WhatsApp"
              keyboardType="phone-pad"
              accessible={true}
              accessibilityLabel={`Telefone do contato SOS ${idx + 1}`}
              placeholderTextColor="#999"
            />
          </View>
        ))}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => setContatos([...contatos, { nome: 'Novo contato', telefone: '', tipo: 'whatsapp' }])}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Adicionar novo contato SOS"
        >
          <Text style={styles.submitButtonText}>Adicionar contato SOS</Text>
        </TouchableOpacity>

          <TouchableOpacity 
            style={styles.submitButton} 
            onPress={handleSave}
            disabled={loading}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Salvar perfil"
            accessibilityState={{ disabled: loading }}
          >
            <Text style={styles.submitButtonText}>{loading ? 'Salvando...' : 'Salvar Perfil'}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.submitButton, styles.logoutButton]} 
            onPress={handleLogout}
            disabled={loading}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Sair da conta"
            accessibilityState={{ disabled: loading }}
          >
            <Text style={styles.submitButtonText}>{loading ? 'Processando...' : 'Sair da Conta'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PerfilScreen;

