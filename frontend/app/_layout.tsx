import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, router, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';

// 👉 Amplify config (v6)
import { configureAmplify } from '../src/api/amplifyConfig';
import { getCurrentUser } from 'aws-amplify/auth';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // 1) Configurar Amplify una sola vez
  useEffect(() => {
    configureAmplify();
  }, []);

  // 2) Propagar errores de carga de fuentes
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  // 3) Ocultar splash cuando terminen fuentes
  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const path = usePathname();

  // 4) Guard de sesión: si no hay usuario -> /auth/sign-in; si hay y está en /auth -> tabs
  useEffect(() => {
    const check = async () => {
      try {
        await getCurrentUser(); // signed-in
        if (path.startsWith('/auth')) router.replace('/(tabs)');
      } catch {
        if (!path.startsWith('/auth')) router.replace('/auth/sign-in');
      }
    };
    check();
  }, [path]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}
