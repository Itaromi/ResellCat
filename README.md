# 🐾 Adopte un Chat — Expo Sandbox App

Une application **React Native (Expo)** d'apprentissage interactive et ludique 🧠.  
Elle regroupe plusieurs mini-exercices (`useState`, `useEffect`, `useContext`, `Zustand`, etc.) et une app principale d'adoption de chats 😺.

---

## 🚀 Stack Technique

![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo)
![React Native](https://img.shields.io/badge/React%20Native-20232A?style=for-the-badge&logo=react)
![Zustand](https://img.shields.io/badge/Zustand-3b3b3b?style=for-the-badge)
![Context](https://img.shields.io/badge/useContext-61DAFB?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-FFD700?style=for-the-badge&logo=javascript)
![Expo Router](https://img.shields.io/badge/Expo%20Router-FF5A5F?style=for-the-badge)

---

## 🧩 Fonctionnalités principales

### 🌍 Application principale
- Navigation avec **Expo Router** (`tabs`, `drawer`, `stack`)
- Pages d'exploration et de détails pour adopter des chats 🐈
- Panier d'adoption géré via **Context API**
- Design clair et épuré avec thème **tomato**

### 🧠 Espace Sandbox
Espace dédié à la pratique des hooks React :
- `exo-state` → utilisation de `useState`
- `exo-effect` → cycle de vie avec `useEffect`
- `exo-context` → bascule clair/sombre avec `useContext`
- `exo-zustand` → store global avec **Zustand** + persistance `AsyncStorage`
- `exo-formulaire` → création d'un formulaire contrôlé

---

## ⚙️ Installation et lancement

### 1️⃣ Cloner le repo
```bash
git clone https://github.com/<ton-username>/adopte-un-chat.git
cd adopte-un-chat
```

### 2️⃣ Installer les dépendances
```bash
npm install
```

ou avec yarn :
```bash
yarn install
```

### 3️⃣ Lancer le projet
```bash
npx expo start
```

Ensuite, scanne le QR code dans **Expo Go** 📱  
ou lance le simulateur iOS / Android depuis la console.

---

## 📁 Structure du projet

```
app/
 ├── (tabs)/               → navigation principale (explorer, panier, profil)
 ├── (sandbox)/            → mini-exos pour apprendre les hooks React
 │    ├── exo-state.js
 │    ├── exo-effect.js
 │    ├── exo-context.js
 │    ├── exo-zustand.js
 │    └── exo-formulaire.js
 ├── store/                → store Zustand global
 │    └── useTaskStore.js
 ├── assets/               → images et sons
 │    ├── images/
 │    └── meow/
 └── _layout.js            → stack root
```

---

## 💾 Fonctionnalités avancées

- **Persistance locale** avec `AsyncStorage` pour le store Zustand 🧠  
- **SafeAreaProvider** pour une meilleure compatibilité iOS/Android  
- **Thème clair / sombre** synchronisé via Context API  
- **Gestion d'état globale** (tâches, panier, thème, etc.)  

---

## 🎮 Mini-jeux intégrés

- **Aim Trainer Cat 🐱** : clique sur le chat pour augmenter ton score et jouer un miaulement aléatoire  
- **Feed the Cat 🍗** : jeu pour apprendre `useContext` et gérer un état partagé d’humeur du chat  

---

## 🧰 Dépendances principales

```json
"dependencies": {
  "expo": "^51.0.0",
  "expo-av": "~14.0.0",
  "expo-router": "^3.5.0",
  "react": "18.x",
  "react-native": "0.73.x",
  "react-native-safe-area-context": "~4.10.0",
  "zustand": "^4.5.2",
  "@react-native-async-storage/async-storage": "^1.21.0"
}
```

---

## 💡 Astuces

- 🗂️ Tous les écrans sandbox sont indépendants : parfaits pour tester chaque hook.
- 🎨 Les couleurs du thème se mettent à jour globalement via le `ThemeContext`.
- 🧠 Le store Zustand garde les tâches même après redémarrage.
- 🔊 Le chat joue un son “meow” aléatoire à chaque clic.

---

## 🧑‍💻 Auteur

**Youn Sylvestre**  
[![GitHub](https://img.shields.io/badge/GitHub-sylvestre.youn-181717?style=for-the-badge&logo=github)](https://github.com/sylvestre.youn)

---

## 🐈 Licence

Ce projet est open-source sous la licence **MIT**.  
Tu peux l'utiliser, le modifier et le partager librement.

---

> 💬 _"Code. Miaule. Repeat."_ 😺
