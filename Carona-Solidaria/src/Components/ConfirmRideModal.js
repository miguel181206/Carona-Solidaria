import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../Styles/styles';

const ConfirmRideModal = ({ visible, motorista, onConfirm, onCancel }) => {
  if (!motorista) return null;

  return (
    <Modal 
      visible={visible} 
      animationType="slide" 
      transparent 
      onRequestClose={onCancel}
      accessible={true}
      accessibilityViewIsModal={true}
    >
      <View style={styles.modalOverlay} accessible={true} accessibilityRole="dialog">
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle} accessible={true} accessibilityRole="text">Confirmar Carona</Text>
            <TouchableOpacity 
              onPress={onCancel} 
              style={styles.closeButton}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Fechar modal"
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionSubtitle} accessible={true} accessibilityRole="text">{motorista.nome}</Text>
          <Text style={styles.motoristaCarro} accessible={true} accessibilityRole="text">{motorista.carro}</Text>
          <Text style={styles.motoristaInfo} accessible={true} accessibilityRole="text">
            ⭐ {motorista.avaliacao} • {motorista.corridas} corridas • {motorista.tempo}
          </Text>
          <Text style={{ marginTop: 10, color: '#333' }} accessible={true} accessibilityRole="text">
            Confirme para iniciar a carona solidária. Você poderá oferecer uma gorjeta opcional depois.
          </Text>

          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.confirmButton} 
              onPress={onConfirm}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Confirmar carona"
            >
              <Text style={styles.confirmButtonText}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.cancelButton} 
              onPress={onCancel}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Cancelar"
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmRideModal;

