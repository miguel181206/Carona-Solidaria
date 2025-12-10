import React, { useState } from 'react';
import { TouchableOpacity, Text, Alert } from 'react-native';
import * as Location from 'expo-location';
import { Linking } from 'react-native';
import { styles } from '../Styles/styles';

const SOSButton = ({ contacts, onLocation }) => {
  const [loading, setLoading] = useState(false);

  const abrirContato = (contato, latitude, longitude) => {
    const texto = `Preciso de ajuda. Minha localização: https://maps.google.com/?q=${latitude},${longitude}`;
    if (contato.tipo === 'whatsapp') {
      const url = `https://wa.me/${contato.telefone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(texto)}`;
      Linking.openURL(url);
    } else {
      Linking.openURL(`tel:${contato.telefone}`);
    }
  };

  const acionarSOS = async () => {
    try {
      setLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Não foi possível obter a localização.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      onLocation?.(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);

      Alert.alert(
        'SOS enviado',
        `Localização: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}.\nEscolha quem avisar:`,
        contacts.map((c) => ({
          text: c.nome,
          onPress: () => abrirContato(c, latitude, longitude),
        })).concat({ text: 'Fechar' })
      );
    } catch (error) {
      Alert.alert('Erro', 'Falha ao acionar SOS. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity 
      style={styles.sosButton} 
      onPress={acionarSOS} 
      disabled={loading}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel="Botão de emergência SOS"
      accessibilityHint="Toque duas vezes para acionar ajuda de emergência e compartilhar sua localização"
      accessibilityState={{ disabled: loading }}
    >
      <Text style={styles.sosButtonText}>{loading ? 'Enviando...' : '🚨 SOS'}</Text>
    </TouchableOpacity>
  );
};

export default SOSButton;

