import React from 'react';
import { View, ActivityIndicator, Text, Modal, StyleSheet } from 'react-native';
import { styles } from '../Styles/styles';

const Loading = ({ visible = false, message = 'Carregando...', fullScreen = false }) => {
  if (!visible) return null;

  if (fullScreen) {
    return (
      <Modal visible={visible} transparent animationType="fade">
        <View style={loadingStyles.fullScreenOverlay}>
          <View style={loadingStyles.fullScreenContent}>
            <ActivityIndicator size="large" color="#9f3458" />
            {message && <Text style={loadingStyles.message}>{message}</Text>}
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <View style={loadingStyles.container}>
      <ActivityIndicator size="small" color="#9f3458" />
      {message && <Text style={loadingStyles.message}>{message}</Text>}
    </View>
  );
};

const loadingStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  fullScreenOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    minWidth: 150,
  },
  message: {
    marginTop: 15,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});

export default Loading;

