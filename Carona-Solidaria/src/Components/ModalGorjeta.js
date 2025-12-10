import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { styles } from '../Styles/styles';

const MAX_GORJETA = 100;

const ModalGorjeta = ({ visible, motorista, onClose, onConfirm }) => {
  const [gorjeta, setGorjeta] = useState(0);
  const [valorPersonalizado, setValorPersonalizado] = useState('');
  const [rating, setRating] = useState(0);
  const [comentario, setComentario] = useState('');

  const handleGorjeta = (valor) => {
    if (valor > MAX_GORJETA) {
      Alert.alert('Limite', `O valor máximo é R$ ${MAX_GORJETA}`);
      return;
    }
    setGorjeta(valor);
  };

  const handleGorjetaPersonalizada = () => {
    const valor = parseFloat(valorPersonalizado);
    if (!valor || valor <= 0) {
      Alert.alert('Erro', 'Digite um valor válido');
      return;
    }
    if (valor > MAX_GORJETA) {
      Alert.alert('Limite', `Máximo permitido: R$ ${MAX_GORJETA}`);
      return;
    }
    setGorjeta(valor);
    setValorPersonalizado('');
  };

  const handleConfirmar = () => {
    onConfirm(gorjeta, { rating, comentario });
    setGorjeta(0);
    setRating(0);
    setComentario('');
  };

  const renderEstrelas = () => {
    const estrelas = [];
    for (let i = 1; i <= 5; i++) {
      estrelas.push(
        <TouchableOpacity
          key={i}
          onPress={() => setRating(i)}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={`Avaliar com ${i} estrela${i > 1 ? 's' : ''}`}
          accessibilityState={{ selected: i <= rating }}
        >
          <Text style={[
            styles.estrela,
            i <= rating && styles.estrelaAtiva
          ]}>
            ★
          </Text>
        </TouchableOpacity>
      );
    }
    return estrelas;
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
      accessible={true}
      accessibilityViewIsModal={true}
    >
      <View style={styles.modalOverlay} accessible={true} accessibilityRole="dialog">
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle} accessible={true} accessibilityRole="text">
              {motorista ? `Avaliar ${motorista.nome}` : 'Avaliar Motorista'}
            </Text>
            <TouchableOpacity 
              onPress={onClose} 
              style={styles.closeButton}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Fechar modal de avaliação"
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>

          <ScrollView>
            {/* Seção Gorjeta */}
            <View style={styles.gorjetaSection} accessible={true} accessibilityRole="region" accessibilityLabel="Seção de gorjeta">
              <Text style={styles.sectionSubtitle} accessible={true} accessibilityRole="text">
                Valor da Gorjeta (opcional, até R$100)
              </Text>
              
              <View style={styles.botoesGorjeta}>
                <TouchableOpacity 
                  style={[
                    styles.gorjetaButton,
                    gorjeta === 2 && styles.gorjetaButtonSelected
                  ]}
                  onPress={() => handleGorjeta(2)}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="Gorjeta de 2 reais"
                  accessibilityState={{ selected: gorjeta === 2 }}
                >
                  <Text style={styles.gorjetaButtonText}>R$2</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[
                    styles.gorjetaButton,
                    gorjeta === 5 && styles.gorjetaButtonSelected
                  ]}
                  onPress={() => handleGorjeta(5)}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="Gorjeta de 5 reais"
                  accessibilityState={{ selected: gorjeta === 5 }}
                >
                  <Text style={styles.gorjetaButtonText}>R$5</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[
                    styles.gorjetaButton,
                    gorjeta === 10 && styles.gorjetaButtonSelected
                  ]}
                  onPress={() => handleGorjeta(10)}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="Gorjeta de 10 reais"
                  accessibilityState={{ selected: gorjeta === 10 }}
                >
                  <Text style={styles.gorjetaButtonText}>R$10</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.personalizadoContainer}>
                <TextInput
                  style={styles.personalizadoInput}
                  value={valorPersonalizado}
                  onChangeText={setValorPersonalizado}
                  placeholder="Outro valor"
                  keyboardType="numeric"
                  accessible={true}
                  accessibilityLabel="Campo para valor personalizado de gorjeta"
                  placeholderTextColor="#999"
                />
                <TouchableOpacity 
                  style={styles.personalizadoButton}
                  onPress={handleGorjetaPersonalizada}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="Confirmar valor personalizado"
                >
                  <Text style={styles.personalizadoButtonText}>Confirmar</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Seção Avaliação */}
            <View style={styles.avaliacaoSection} accessible={true} accessibilityRole="region" accessibilityLabel="Seção de avaliação">
              <Text style={styles.sectionSubtitle} accessible={true} accessibilityRole="text">Avalie seu motorista</Text>
              
              <View style={styles.estrelasContainer} accessible={true} accessibilityRole="radiogroup" accessibilityLabel="Avaliação por estrelas">
                {renderEstrelas()}
              </View>
              
              <TextInput
                style={styles.comentarioInput}
                value={comentario}
                onChangeText={setComentario}
                placeholder="Deixe um comentário (opcional)"
                multiline
                numberOfLines={3}
                accessible={true}
                accessibilityLabel="Campo de comentário"
                accessibilityHint="Digite um comentário sobre a viagem"
                placeholderTextColor="#999"
              />
            </View>

            {/* Botões de Ação */}
            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={styles.confirmButton}
                onPress={handleConfirmar}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel={`Confirmar avaliação${gorjeta > 0 ? ` com gorjeta de ${gorjeta.toFixed(2)} reais` : ' sem gorjeta'}`}
              >
                <Text style={styles.confirmButtonText}>
                  Confirmar {gorjeta > 0 ? `R$ ${gorjeta.toFixed(2)}` : 'sem gorjeta'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={onClose}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel="Pular avaliação"
              >
                <Text style={styles.cancelButtonText}>Pular</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default ModalGorjeta;