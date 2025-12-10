import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_KEY = '@carona_solidaria_auth';
const USER_KEY = '@carona_solidaria_user';

export const login = async (userData) => {
  try {
    const authData = {
      isLoggedIn: true,
      loginTime: new Date().toISOString(),
    };
    await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(authData));
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
    return true;
  } catch (error) {
    return false;
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem(AUTH_KEY);
    await AsyncStorage.removeItem(USER_KEY);
    return true;
  } catch (error) {
    return false;
  }
};

export const isLoggedIn = async () => {
  try {
    const data = await AsyncStorage.getItem(AUTH_KEY);
    if (!data) return false;
    const authData = JSON.parse(data);
    return authData.isLoggedIn === true;
  } catch (error) {
    return false;
  }
};

export const getCurrentUser = async () => {
  try {
    const data = await AsyncStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    return null;
  }
};

export const checkAuthStatus = async () => {
  const loggedIn = await isLoggedIn();
  const user = await getCurrentUser();
  return { loggedIn, user };
};

