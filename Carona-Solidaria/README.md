# 🚗 Carona Solidária

Aplicativo mobile desenvolvido em React Native (Expo) para conectar passageiros e motoristas em caronas solidárias, com foco especial em segurança e acessibilidade.

## 📱 Sobre o Projeto

O **Carona Solidária** é uma plataforma que facilita o compartilhamento de caronas entre usuários, promovendo economia, sustentabilidade e segurança. O aplicativo foi desenvolvido com ênfase em funcionalidades de segurança, especialmente para mulheres, incluindo rastreamento em tempo real, botão SOS e filtros de busca personalizados.

## ✨ Funcionalidades

### 🔍 Busca de Caronas
- Busca de motoristas disponíveis
- Filtro por gênero (apenas motoristas mulheres)
- Informações detalhadas dos motoristas (avaliação, histórico, veículo)
- Confirmação de carona com modal de detalhes

### 🛡️ Segurança
- **Rastreamento em Tempo Real**: Atualização automática de localização durante viagens
- **Botão SOS**: Acesso rápido a contatos de emergência com compartilhamento de localização
- **Compartilhamento de Localização**: Permite compartilhar rota com contatos de confiança
- **Configurações de Segurança**: Controle total sobre rastreamento e privacidade

### 📊 Histórico e Avaliação
- Histórico completo de viagens realizadas
- Sistema de avaliação com estrelas (1-5)
- Gorjeta opcional para motoristas
- Comentários sobre a experiência

### 👤 Perfil do Usuário
- Gerenciamento de perfil pessoal
- Configuração de contatos SOS
- Sistema de autenticação e logout
- Dados salvos localmente

### 🔔 Notificações e Feedback
- Sistema de notificações toast
- Feedback visual para todas as ações
- Indicadores de carregamento
- Tratamento de erros de conexão

### ♿ Acessibilidade
- Suporte completo a leitores de tela
- Labels descritivos para todos os elementos
- Navegação por teclado
- Contraste adequado de cores

## 🛠️ Tecnologias Utilizadas

### Core
- **React Native** 0.79.6
- **Expo SDK** 54.0.19
- **React** 19.0.0

### Navegação
- **@react-navigation/native** 7.1.19
- **@react-navigation/drawer** 7.5.8
- **@react-navigation/stack** 7.6.3

### Armazenamento
- **@react-native-async-storage/async-storage** 2.2.0

### Localização
- **expo-location** 19.0.8

### Conectividade
- **@react-native-community/netinfo** 11.4.1

### UI/UX
- **react-native-safe-area-context** 5.6.2
- **react-native-gesture-handler** 2.24.0
- **react-native-reanimated** 3.17.4

## 📦 Instalação

### Pré-requisitos
- Node.js (versão 20.19.4 ou superior recomendada)
- npm ou yarn
- Expo CLI instalado globalmente
- Dispositivo móvel com Expo Go ou emulador Android/iOS

### Passos para Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd carona
```

2. **Instale as dependências**
```bash
npm install
```

3. **Inicie o servidor de desenvolvimento**
```bash
npm start
```

4. **Execute no dispositivo**
   - **Android**: `npm run android`
   - **iOS**: `npm run ios`
   - **Web**: `npm run web`
   - **Expo Go**: Escaneie o QR code com o app Expo Go

## 🚀 Como Usar

### Primeiro Uso

1. Abra o aplicativo
2. Configure seu perfil em "Meu Perfil"
3. Adicione contatos SOS para emergências
4. Configure suas preferências de segurança

### Buscar uma Carona

1. Na tela inicial, preencha:
   - Seu nome
   - Local de origem
   - Local de destino
2. (Opcional) Ative o filtro "Apenas motoristas mulheres"
3. Toque em "Procurar Carona"
4. Selecione um motorista disponível
5. Confirme a carona no modal
6. Aguarde a chegada do motorista

### Durante a Viagem

- A localização é atualizada automaticamente
- Use o botão SOS em caso de emergência
- Acompanhe o tempo de viagem no timer
- Visualize sua localização atual

### Após a Viagem

- Avalie o motorista (1-5 estrelas)
- Deixe um comentário (opcional)
- Ofereça uma gorjeta (opcional)
- A viagem será salva no histórico

## 📁 Estrutura do Projeto

```
carona/
├── App.js                 # Componente principal
├── index.js               # Ponto de entrada
├── app.json              # Configurações do Expo
├── package.json          # Dependências do projeto
├── assets/               # Imagens e recursos
│   ├── icon.png
│   ├── splash-icon.png
│   └── adaptive-icon.png
└── src/
    ├── Components/       # Componentes reutilizáveis
    │   ├── ConfirmRideModal.js
    │   ├── ConnectionError.js
    │   ├── DriverCard.js
    │   ├── Header.js
    │   ├── Loading.js
    │   ├── ModalGorjeta.js
    │   ├── Notification.js
    │   └── SOSButton.js
    ├── Screen/           # Telas do aplicativo
    │   ├── HomeScreen.js
    │   ├── PerfilScreen.js
    │   ├── SegurancaScreen.js
    │   ├── HistoricoScreen.js
    │   ├── ComoFuncionaScreen.js
    │   └── SobreScreen.js
    ├── navigation/       # Configuração de navegação
    │   └── DrawerNavigator.js
    ├── storage/          # Gerenciamento de dados locais
    │   ├── auth.js
    │   ├── history.js
    │   └── profile.js
    ├── Utils/            # Hooks e utilitários
    │   ├── useConnection.js
    │   └── useLocation.js
    ├── Styles/           # Estilos globais
    │   └── styles.js
    └── data/             # Dados mockados
        └── motoristas.js
```

## 🎯 Funcionalidades Principais

### Sistema de Autenticação
- Login e logout de usuários
- Persistência de sessão
- Gerenciamento de dados do usuário

### Sistema de Localização
- Atualização automática durante viagens
- Compartilhamento com contatos SOS
- Histórico de localizações

### Sistema de Conexão
- Detecção de status de internet
- Avisos quando offline
- Bloqueio de ações sem conexão

### Sistema de Carregamento
- Indicadores visuais durante operações
- Modo fullscreen para ações importantes
- Feedback em tempo real

### Sistema de Segurança
- Rastreamento configurável
- Botão SOS com localização
- Configurações de privacidade

## 🔒 Segurança e Privacidade

- Todos os dados são armazenados localmente no dispositivo
- Localização só é compartilhada quando explicitamente autorizado
- Contatos SOS são configuráveis pelo usuário
- Nenhum dado é enviado para servidores externos (versão atual)

## ♿ Acessibilidade

O aplicativo foi desenvolvido seguindo as melhores práticas de acessibilidade:

- **Labels descritivos**: Todos os elementos têm `accessibilityLabel`
- **Roles apropriados**: Uso correto de `accessibilityRole`
- **Hints contextuais**: `accessibilityHint` para ações importantes
- **Estados acessíveis**: `accessibilityState` para estados dinâmicos
- **Suporte a leitores de tela**: Compatível com TalkBack (Android) e VoiceOver (iOS)

## 🐛 Tratamento de Erros

- Verificação de conexão com internet
- Validação de permissões de localização
- Feedback visual para erros
- Mensagens de erro amigáveis

## 📱 Compatibilidade

- **Android**: 5.0+ (API 21+)
- **iOS**: 11.0+
- **Web**: Navegadores modernos (Chrome, Firefox, Safari, Edge)

## 🚧 Melhorias Futuras

- [ ] Integração com backend real
- [ ] Sistema de notificações push
- [ ] Chat em tempo real com motoristas
- [ ] Integração com mapas (Google Maps/Mapbox)
- [ ] Sistema de pagamento integrado
- [ ] Verificação de documentos de motoristas
- [ ] Sistema de denúncias
- [ ] Modo escuro
- [ ] Internacionalização (i18n)

## 👥 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença **0BSD** (BSD Zero Clause License).

## 👨‍💻 Desenvolvido por

**UniSENAI PR** - Projeto acadêmico

## 📞 Suporte

Para suporte, abra uma issue no repositório ou entre em contato através do aplicativo na seção "Sobre".

## 🙏 Agradecimentos

- Expo pela plataforma incrível
- Comunidade React Native
- Todos os contribuidores de código aberto

---

**Versão**: 1.0.0  
**Última atualização**: 2025

