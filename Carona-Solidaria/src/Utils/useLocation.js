import { useState, useEffect, useRef } from 'react';
import * as Location from 'expo-location';

export const useLocation = (updateInterval = 5000) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState(null);
  const watchSubscription = useRef(null);

  const requestPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setPermissionStatus(status);
      return status === 'granted';
    } catch (err) {
      setError('Erro ao solicitar permissão de localização');
      return false;
    }
  };

  const getCurrentLocation = async () => {
    try {
      const hasPermission = await requestPermission();
      if (!hasPermission) {
        setError('Permissão de localização negada');
        return null;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        timestamp: new Date().toISOString(),
      });
      setError(null);
      return currentLocation;
    } catch (err) {
      setError('Erro ao obter localização');
      return null;
    }
  };

  const startLocationUpdates = async () => {
    try {
      const hasPermission = await requestPermission();
      if (!hasPermission) {
        setError('Permissão de localização negada');
        return false;
      }

      watchSubscription.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: updateInterval,
          distanceInterval: 10, // metros
        },
        (newLocation) => {
          setLocation({
            latitude: newLocation.coords.latitude,
            longitude: newLocation.coords.longitude,
            timestamp: new Date().toISOString(),
          });
          setError(null);
        }
      );
      return true;
    } catch (err) {
      setError('Erro ao iniciar atualização de localização');
      return false;
    }
  };

  const stopLocationUpdates = () => {
    if (watchSubscription.current) {
      watchSubscription.current.remove();
      watchSubscription.current = null;
    }
  };

  useEffect(() => {
    return () => {
      stopLocationUpdates();
    };
  }, []);

  return {
    location,
    error,
    permissionStatus,
    getCurrentLocation,
    startLocationUpdates,
    stopLocationUpdates,
    requestPermission,
  };
};

