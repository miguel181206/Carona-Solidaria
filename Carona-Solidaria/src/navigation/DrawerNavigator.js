import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, Image, Text } from 'react-native';
import HomeScreen from '../Screen/HomeScreen';
import SobreScreen from '../Screen/SobreScreen';
import ComoFuncionaScreen from '../Screen/ComoFuncionaScreen';
import SegurancaScreen from '../Screen/SegurancaScreen';
import PerfilScreen from '../Screen/PerfilScreen';
import HistoricoScreen from '../Screen/HistoricoScreen';
import { styles } from '../Styles/styles';

const Drawer = createDrawerNavigator();
const PLACEHOLDER_LOGO = 'https://via.placeholder.com/60/ffffff/9f3458?text=CS';

const CustomDrawerContent = (props) => (
  <DrawerContentScrollView {...props}>
    <View style={styles.drawerHeader}>
      <Image source={{ uri: PLACEHOLDER_LOGO }} style={styles.drawerLogo} />
      <Text style={styles.drawerTitle}>Carona Solidária</Text>
    </View>

    <DrawerItem label="Início" onPress={() => props.navigation.navigate('Início')} labelStyle={styles.drawerLabel} />
    <DrawerItem label="Sobre" onPress={() => props.navigation.navigate('Sobre')} labelStyle={styles.drawerLabel} />
    <DrawerItem label="Como Funciona" onPress={() => props.navigation.navigate('Como Funciona')} labelStyle={styles.drawerLabel} />
    <DrawerItem label="Segurança" onPress={() => props.navigation.navigate('Segurança')} labelStyle={styles.drawerLabel} />
    <DrawerItem label="Meu Perfil" onPress={() => props.navigation.navigate('Perfil')} labelStyle={styles.drawerLabel} />
    <DrawerItem label="Histórico" onPress={() => props.navigation.navigate('Histórico')} labelStyle={styles.drawerLabel} />

    <View style={styles.drawerFooter}>
      <Text style={styles.footerText}>© 2025 Carona Solidária / UniSENAI PR</Text>
    </View>
  </DrawerContentScrollView>
);

const DrawerNavigator = () => (
  <NavigationContainer>
    <Drawer.Navigator
      initialRouteName="Início"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#f8bbd0',
        drawerActiveTintColor: '#9f3458',
        drawerInactiveTintColor: '#333',
      }}
    >
      <Drawer.Screen name="Início" component={HomeScreen} />
      <Drawer.Screen name="Sobre" component={SobreScreen} />
      <Drawer.Screen name="Como Funciona" component={ComoFuncionaScreen} />
      <Drawer.Screen name="Segurança" component={SegurancaScreen} />
      <Drawer.Screen name="Perfil" component={PerfilScreen} />
      <Drawer.Screen name="Histórico" component={HistoricoScreen} />
    </Drawer.Navigator>
  </NavigationContainer>
);

export default DrawerNavigator;

