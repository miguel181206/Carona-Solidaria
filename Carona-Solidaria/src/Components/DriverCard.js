import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from '../Styles/styles';

const DriverCard = ({ motorista, onPress }) => {
  const accessibilityLabel = `Motorista ${motorista.nome}, avaliação ${motorista.avaliacao}, ${motorista.tempo} de distância, ${motorista.corridas} corridas realizadas, carro ${motorista.carro}`;
  
  return (
    <TouchableOpacity 
      style={styles.motoristaCard} 
      onPress={() => onPress?.(motorista)}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint="Toque duas vezes para selecionar este motorista"
    >
      <View style={styles.motoristaHeader}>
        <Image 
          source={{ uri: motorista.foto }} 
          style={styles.motoristaImg}
          accessible={true}
          accessibilityLabel={`Foto de ${motorista.nome}`}
        />
        <View style={styles.motoristaInfoContainer}>
          <Text style={styles.motoristaNome} accessible={true} accessibilityRole="text">{motorista.nome}</Text>
          <Text style={styles.motoristaInfo} accessible={true} accessibilityRole="text">
            ⭐ {motorista.avaliacao} • {motorista.tempo} • {motorista.corridas} corridas
          </Text>
        </View>
      </View>
      <Text style={styles.motoristaCarro} accessible={true} accessibilityRole="text">{motorista.carro}</Text>
      <Text style={styles.motoristaPreco} accessible={true} accessibilityRole="text">Contribuição opcional</Text>
    </TouchableOpacity>
  );
};

export default DriverCard;

