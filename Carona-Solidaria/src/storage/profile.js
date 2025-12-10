import AsyncStorage from '@react-native-async-storage/async-storage';

const PROFILE_KEY = '@carona_solidaria_perfil';

export const loadProfile = async () => {
  try {
    const data = await AsyncStorage.getItem(PROFILE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    return null;
  }
};

export const saveProfile = async (profile) => {
  try {
    await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    return true;
  } catch (error) {
    return false;
  }
};

