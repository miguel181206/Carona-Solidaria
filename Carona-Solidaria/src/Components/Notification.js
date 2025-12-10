import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated } from 'react-native';
import { styles } from '../Styles/styles';

const ICONS = {
  success: '✅',
  error: '❌',
  warning: '⚠️',
  info: 'ℹ️',
};

const Notification = ({ message, type = 'info', duration = 2000, onHide }) => {
  const [visible, setVisible] = useState(true);
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, { toValue: 1, duration: 150, useNativeDriver: true }).start();

    const timer = setTimeout(() => {
      Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => {
        setVisible(false);
        onHide?.();
      });
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onHide, opacity]);

  if (!visible) return null;

  const icon = ICONS[type] || ICONS.info;
  const colors = {
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FFC107',
    info: '#2196F3',
  };

  return (
    <Animated.View style={[styles.notificationCard, { backgroundColor: colors[type] || colors.info, opacity }]}>
      <Text style={styles.notificationIcon}>{icon}</Text>
      <Text style={styles.notificationMessage}>{message}</Text>
    </Animated.View>
  );
};

export default Notification;

