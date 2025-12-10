import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from '../Styles/styles';
import { useConnection } from '../Utils/useConnection';

const ConnectionError = ({ onRetry, message = 'Sem conexão com a internet' }) => {
  const { isConnected } = useConnection();

  if (isConnected) return null;

  return (
    <View style={connectionStyles.container} accessible={true} accessibilityRole="alert" accessibilityLabel="Erro de conexão com a internet">
      <Text style={connectionStyles.icon}>📡</Text>
      <Text style={connectionStyles.message}>{message}</Text>
      <Text style={connectionStyles.subMessage}>Verifique sua conexão e tente novamente</Text>
      {onRetry && (
        <TouchableOpacity 
          style={connectionStyles.retryButton} 
          onPress={onRetry}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Tentar novamente"
        >
          <Text style={connectionStyles.retryButtonText}>Tentar Novamente</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const connectionStyles = StyleSheet.create({
  container: {
    backgroundColor: '#ffebee',
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
    padding: 15,
    margin: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  icon: {
    fontSize: 32,
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d32f2f',
    marginBottom: 5,
    textAlign: 'center',
  },
  subMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
  },
  retryButton: {
    backgroundColor: '#9f3458',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default ConnectionError;

