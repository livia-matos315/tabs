import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList, TabParamList } from './types/navigation';

import Login from './screens/Login';
import Home from './screens/Home';
import Perfil from './screens/Perfil';
import Detalhes from './screens/Detalhes';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function TabIcon({ emoji, label, focused }: { emoji: string; label: string; focused: boolean }) {
  return (
    <View style={[tabStyles.iconWrap, focused && tabStyles.iconWrapActive]}>
      <Text style={tabStyles.emoji}>{emoji}</Text>
      {focused && <Text style={tabStyles.label}>{label}</Text>}
    </View>
  );
}

const tabStyles = StyleSheet.create({
  iconWrap: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 25, gap: 8 },
  iconWrapActive: { backgroundColor: '#3D2314' },
  emoji: { fontSize: 26 },
  label: { fontSize: 16, fontWeight: '700', color: '#FFF' },
});

function TabNavigator({ route }: any) {
  const usuario = route?.params?.usuario || 'Visitante';
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarStyle: { height: Platform.OS === 'ios' ? 100 : 80 } }}>
      <Tab.Screen name="Explorar" component={Home} initialParams={{ usuario }} options={{ tabBarIcon: ({ focused }) => <TabIcon emoji="🔍" label="Explorar" focused={focused} /> }} />
      <Tab.Screen name="Perfil" component={Perfil} initialParams={{ usuario }} options={{ tabBarIcon: ({ focused }) => <TabIcon emoji="👤" label="Perfil" focused={focused} /> }} />
    </Tab.Navigator>
  );
}

export default function AppNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="PetDetalhes" component={Detalhes} options={{ headerShown: true, headerTitle: '', headerStyle: { backgroundColor: '#FDF6EE' }, headerShadowVisible: false }} />
    </Stack.Navigator>
  );
}