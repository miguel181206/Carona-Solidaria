import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from '../Styles/styles';

const PLACEHOLDER_LOGO = 'https://via.placeholder.com/60/ffffff/9f3458?text=CS';
const MENU_ICON = 'https://img.icons8.com/ios-filled/50/ffffff/menu--v1.png';

const Header = ({ navigation, title, onOpenProfile }) => {
  return (
    <View style={styles.header} accessible={true} accessibilityRole="banner">
      <View style={styles.headerContent}>
        <TouchableOpacity 
          onPress={() => navigation?.openDrawer()}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Abrir menu de navegação"
          accessibilityHint="Toque duas vezes para abrir o menu lateral"
        >
          <Image 
            source={{ uri: MENU_ICON }} 
            style={styles.menuIcon}
            accessible={true}
            accessibilityLabel="Ícone de menu"
          />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => navigation?.navigate?.('Início')} 
          style={{ flex: 1 }}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={`Ir para ${title}`}
        >
          <Text style={styles.headerTitle} accessible={true} accessibilityRole="text">{title}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={onOpenProfile}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Abrir perfil do usuário"
          accessibilityHint="Toque duas vezes para ver seu perfil"
        >
          <Image 
            source={{ uri: PLACEHOLDER_LOGO }} 
            style={styles.logo}
            accessible={true}
            accessibilityLabel="Logo do aplicativo"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

