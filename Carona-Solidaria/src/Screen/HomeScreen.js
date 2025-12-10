// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  Image,
} from 'react-native';
import Header from '../Components/Header';
import Notification from '../Components/Notification';
import DriverCard from '../Components/DriverCard';
import ConfirmRideModal from '../Components/ConfirmRideModal';
import ModalGorjeta from '../Components/ModalGorjeta';
import SOSButton from '../Components/SOSButton';
import Loading from '../Components/Loading';
import ConnectionError from '../Components/ConnectionError';
import { motoristasData } from '../data/motoristas';
import { styles } from '../Styles/styles';
import { loadHistory, saveHistory } from '../storage/history';
import { loadProfile } from '../storage/profile';
import { useConnection } from '../Utils/useConnection';
import { useLocation } from '../Utils/useLocation';

const PLACEHOLDER_MAP = 'https://via.placeholder.com/400x200/9f3458/ffffff?text=Mapa+Carona+Solidária';

const HomeScreen = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [somenteMulheres, setSomenteMulheres] = useState(false);
  const [buscou, setBuscou] = useState(false);
  const [motoristasEncontrados, setMotoristasEncontrados] = useState([]);
  const [mapaVisible, setMapaVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [motoristaSelecionado, setMotoristaSelecionado] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showGorjeta, setShowGorjeta] = useState(false);
  const [timer, setTimer] = useState('00:00');
  const [statusCarona, setStatusCarona] = useState('Nenhuma carona ativa no momento');
  const [historico, setHistorico] = useState([]);
  const [corridaAtivaId, setCorridaAtivaId] = useState(null);
  const [ultimaLocalizacao, setUltimaLocalizacao] = useState(null);
  const [loading, setLoading] = useState(false);
  const [buscandoMotoristas, setBuscandoMotoristas] = useState(false);
  const timerRef = useRef(null);
  const { isConnected } = useConnection();
  const { location, startLocationUpdates, stopLocationUpdates, requestPermission } = useLocation();
  const [contatosSOS, setContatosSOS] = useState([
    { nome: 'Emergência 190', telefone: '190', tipo: 'telefone' },
    { nome: 'Contato Familiar', telefone: '+5541999999999', tipo: 'whatsapp' },
  ]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const savedHistory = await loadHistory();
        setHistorico(savedHistory);
        const savedProfile = await loadProfile();
        if (savedProfile?.contatosSOS) setContatosSOS(savedProfile.contatosSOS);
        else if (savedHistory?.[0]?.contatosSOS) setContatosSOS(savedHistory[0].contatosSOS);
        
        // Verificar se há corrida ativa e iniciar atualização de localização
        const corridaAtiva = savedHistory?.find(h => h.status === 'Em andamento');
        if (corridaAtiva) {
          setCorridaAtivaId(corridaAtiva.id);
          setStatusCarona(
            `Motorista: ${corridaAtiva.motorista}\nCarro: ${corridaAtiva.carro}\nTempo estimado: ${corridaAtiva.estimativaMin} minutos`
          );
          startLocationUpdates();
        }
      } catch (error) {
        showNotification('Erro ao carregar dados', 'error');
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      stopLocationUpdates();
    };
  }, []);

  // Atualizar localização quando houver mudança
  useEffect(() => {
    if (location && corridaAtivaId) {
      const locString = `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`;
      setUltimaLocalizacao(locString);
      setHistorico((prev) => {
        const atualizado = prev.map((h) =>
          h.id === corridaAtivaId ? { ...h, localizacao: locString } : h
        );
        saveHistory(atualizado);
        return atualizado;
      });
    }
  }, [location, corridaAtivaId]);

  const showNotification = (message, type = 'info', duration = 1200) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type, duration }]);
  };

  const hideNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const buscarCarona = async () => {
    if (!isConnected) {
      showNotification('Sem conexão com a internet', 'error');
      return;
    }
    
    setBuscandoMotoristas(true);
    setBuscou(true);
    
    // Simular delay de busca
    setTimeout(() => {
      const filtrados = motoristasData.filter((m) => {
        if (somenteMulheres && !m.feminino) return false;
        return true;
      });
      setMotoristasEncontrados(filtrados);
      setBuscandoMotoristas(false);
      if (filtrados.length === 0) {
        showNotification('Nenhum motorista encontrado. Tente ajustar filtros.', 'warning');
      }
    }, 1000);
  };

  const selecionarMotorista = (motorista) => {
    setMotoristaSelecionado(motorista);
    setShowConfirm(true);
  };

  const confirmarCarona = async () => {
    if (!motoristaSelecionado) return;

    // Solicitar permissão de localização ao iniciar corrida
    const hasPermission = await requestPermission();
    if (hasPermission) {
      startLocationUpdates();
    }

    const tempoEstimado = Math.floor(Math.random() * 15) + 5;
    setStatusCarona(
      `Motorista: ${motoristaSelecionado.nome}\nCarro: ${motoristaSelecionado.carro}\nTempo estimado: ${tempoEstimado} minutos`
    );
    setTimer('00:00');
    showNotification(`✅ ${motoristaSelecionado.nome} está a caminho!`, 'success');

    const novaCorridaId = Date.now().toString();
    const novaCorrida = {
      id: novaCorridaId,
      passageira: nome || 'Passageira',
      origem: origem || 'Origem não informada',
      destino: destino || 'Destino não informado',
      motorista: motoristaSelecionado.nome,
      carro: motoristaSelecionado.carro,
      status: 'Em andamento',
      inicio: new Date().toISOString(),
      estimativaMin: tempoEstimado,
    };
    const novoHistorico = [novaCorrida, ...historico].slice(0, 10);
    setHistorico(novoHistorico);
    saveHistory(novoHistorico);
    setCorridaAtivaId(novaCorridaId);

    // Limpar timer anterior se existir
    if (timerRef.current) clearInterval(timerRef.current);
    
    let segundos = 0;
    timerRef.current = setInterval(() => {
      segundos += 1;
      const minutos = Math.floor(segundos / 60);
      const segs = segundos % 60;
      setTimer(`${minutos.toString().padStart(2, '0')}:${segs.toString().padStart(2, '0')}`);
      if (segundos >= tempoEstimado * 60) {
        clearInterval(timerRef.current);
        stopLocationUpdates();
        showNotification('Você chegou ao destino!', 'success');
        setHistorico((prev) => {
          const atualizado = prev.map((h) =>
            h.id === novaCorridaId
              ? { ...h, status: 'Concluída', fim: new Date().toISOString() }
              : h
          );
          saveHistory(atualizado);
          return atualizado;
        });
        setCorridaAtivaId(null);
        setShowGorjeta(true);
      }
    }, 1000);

    setShowConfirm(false);
    setMotoristaSelecionado(null);
  };

  const confirmarGorjeta = (valor, avaliacao) => {
    if (valor > 0) {
      showNotification(`Gorjeta de R$ ${valor.toFixed(2)} enviada. Obrigado!`, 'success');
    } else {
      showNotification('Avaliação registrada sem gorjeta.', 'info');
    }
    setHistorico((prev) => {
      const atualizado = prev.map((h) =>
        h.id === corridaAtivaId ? { ...h, gorjeta: valor, avaliacao } : h
      );
      saveHistory(atualizado);
      return atualizado;
    });
    setShowGorjeta(false);
  };

  return (
    <SafeAreaView style={styles.container} accessible={true} accessibilityLabel="Tela principal de busca de carona">
      <Header navigation={navigation} title="Carona Solidária" onOpenProfile={() => navigation.navigate('Perfil')} />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Loading visible={loading} message="Carregando dados..." />
        
        <ConnectionError 
          onRetry={() => {
            buscarCarona();
          }}
        />

        <View style={styles.notificationContainer}>
          {notifications.map((notif) => (
            <Notification
              key={notif.id}
              message={notif.message}
              type={notif.type}
              duration={notif.duration}
              onHide={() => hideNotification(notif.id)}
            />
          ))}
        </View>

        <View style={styles.section} accessible={true} accessibilityRole="form">
          <Text style={styles.sectionTitle} accessible={true} accessibilityRole="text">Buscar Carona</Text>
          <View style={styles.form}>
            <Text style={styles.label} accessible={true} accessibilityRole="text">Seu nome:</Text>
            <TextInput 
              style={styles.input} 
              value={nome} 
              onChangeText={setNome} 
              placeholder="Digite seu nome" 
              placeholderTextColor="#999"
              accessible={true}
              accessibilityLabel="Campo de nome"
              accessibilityHint="Digite seu nome completo"
            />

            <Text style={styles.label} accessible={true} accessibilityRole="text">Origem:</Text>
            <TextInput
              style={styles.input}
              value={origem}
              onChangeText={setOrigem}
              placeholder="Ex: Bairro, Rua..."
              placeholderTextColor="#999"
              accessible={true}
              accessibilityLabel="Campo de origem"
              accessibilityHint="Digite o local de partida"
            />

            <Text style={styles.label} accessible={true} accessibilityRole="text">Destino:</Text>
            <TextInput
              style={styles.input}
              value={destino}
              onChangeText={setDestino}
              placeholder="Ex: UniSENAI PR"
              placeholderTextColor="#999"
              accessible={true}
              accessibilityLabel="Campo de destino"
              accessibilityHint="Digite o local de destino"
            />

            <View style={styles.switchContainer} accessible={true} accessibilityRole="switch" accessibilityState={{ checked: somenteMulheres }}>
              <Text style={styles.switchLabel}>Apenas motoristas mulheres</Text>
              <Switch
                value={somenteMulheres}
                onValueChange={setSomenteMulheres}
                thumbColor={somenteMulheres ? '#9f3458' : '#f4f3f4'}
                trackColor={{ false: '#767577', true: '#f8bbd0' }}
                accessible={true}
                accessibilityLabel="Filtrar apenas motoristas mulheres"
              />
            </View>

            <TouchableOpacity 
              style={styles.button} 
              onPress={buscarCarona}
              disabled={buscandoMotoristas || !isConnected}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Procurar carona"
              accessibilityState={{ disabled: buscandoMotoristas || !isConnected }}
            >
              <Text style={styles.buttonText}>
                {buscandoMotoristas ? 'Buscando motoristas...' : 'Procurar Carona'}
              </Text>
            </TouchableOpacity>
            {buscandoMotoristas && (
              <View style={{ marginTop: 10 }}>
                <Loading visible={true} message="Buscando motoristas..." />
              </View>
            )}

            <SOSButton
              contacts={contatosSOS}
              onLocation={(loc) => {
                setUltimaLocalizacao(loc);
                setHistorico((prev) => {
                  const atualizado = prev.map((h) =>
                    h.id === corridaAtivaId ? { ...h, localizacao: loc } : h
                  );
                  saveHistory(atualizado);
                  return atualizado;
                });
              }}
            />
          </View>
        </View>

        <View style={styles.section} accessible={true} accessibilityRole="region" accessibilityLabel="Lista de motoristas disponíveis">
          <Text style={styles.sectionTitle} accessible={true} accessibilityRole="text">Motoristas Disponíveis</Text>
          {!buscou ? (
            <Text style={styles.emptyText} accessible={true} accessibilityRole="text">
              Clique em "Procurar Carona" para listar motoristas.
            </Text>
          ) : motoristasEncontrados.length === 0 ? (
            <Text style={styles.emptyText} accessible={true} accessibilityRole="text">
              Nenhum motorista disponível no momento
            </Text>
          ) : (
            motoristasEncontrados.map((motorista) => (
              <DriverCard key={motorista.id.toString()} motorista={motorista} onPress={selecionarMotorista} />
            ))
          )}
        </View>

        <View style={styles.section} accessible={true} accessibilityRole="region" accessibilityLabel="Mapa da rota">
          <Text style={styles.sectionTitle} accessible={true} accessibilityRole="text">Mapa</Text>
          <TouchableOpacity 
            style={styles.mapButton} 
            onPress={() => setMapaVisible(!mapaVisible)}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={mapaVisible ? "Ocultar mapa" : "Mostrar mapa"}
            accessibilityState={{ selected: mapaVisible }}
          >
            <Text style={styles.mapButtonText}>{mapaVisible ? 'Ocultar Mapa' : 'Ver Mapa'}</Text>
          </TouchableOpacity>
          {mapaVisible && (
            <Image 
              source={{ uri: PLACEHOLDER_MAP }} 
              style={styles.mapImage} 
              resizeMode="cover"
              accessible={true}
              accessibilityLabel="Mapa mostrando a rota da carona"
            />
          )}
        </View>

        <View style={styles.section} accessible={true} accessibilityRole="region" accessibilityLabel="Status da carona atual">
          <View style={styles.statusCard}>
            <Text style={styles.statusTitle} accessible={true} accessibilityRole="text">Sua Carona</Text>
            <Text style={styles.statusText} accessible={true} accessibilityRole="text">{statusCarona}</Text>
            <Text style={styles.timer} accessible={true} accessibilityRole="text" accessibilityLabel={`Tempo de viagem: ${timer}`}>
              {timer}
            </Text>
            {ultimaLocalizacao && (
              <Text style={styles.statusText} accessible={true} accessibilityRole="text">
                Localização: {ultimaLocalizacao}
              </Text>
            )}
            {location && corridaAtivaId && (
              <Text style={[styles.statusText, { fontSize: 12, color: '#4CAF50', marginTop: 5 }]} accessible={true}>
                ✓ Localização atualizada automaticamente
              </Text>
            )}
          </View>
        </View>

        <View style={styles.section} accessible={true} accessibilityRole="region" accessibilityLabel="Histórico de viagens">
          <Text style={styles.sectionTitle} accessible={true} accessibilityRole="text">Histórico de Viagens</Text>
          {historico.length === 0 ? (
            <Text style={styles.emptyText} accessible={true} accessibilityRole="text">
              Você ainda não tem viagens registradas.
            </Text>
          ) : (
            historico.map((item) => (
              <View key={item.id} style={styles.historyCard} accessible={true} accessibilityRole="text">
                <Text style={styles.historyTitle} accessible={true}>{item.destino}</Text>
                <Text style={styles.historyInfo} accessible={true}>
                  Motorista: {item.motorista} • {item.carro}
                </Text>
                <Text style={styles.historyInfo} accessible={true}>Origem: {item.origem}</Text>
                {item.localizacao && (
                  <Text style={styles.historyInfo} accessible={true}>
                    Localização: {item.localizacao}
                  </Text>
                )}
                <Text style={styles.historyStatus} accessible={true}>
                  {item.status}
                  {item.gorjeta ? ` • Gorjeta R$ ${item.gorjeta.toFixed(2)}` : ''}
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      <ConfirmRideModal
        visible={showConfirm}
        motorista={motoristaSelecionado}
        onConfirm={confirmarCarona}
        onCancel={() => setShowConfirm(false)}
      />

      <ModalGorjeta
        visible={showGorjeta}
        motorista={motoristaSelecionado}
        onClose={() => setShowGorjeta(false)}
        onConfirm={confirmarGorjeta}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

