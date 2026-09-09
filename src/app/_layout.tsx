import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'RedHatDisplay-Regular': require('@/assets/fonts/RedHatDisplay-Regular.ttf'),
    'RedHatDisplay-Medium': require('@/assets/fonts/RedHatDisplay-Medium.ttf'),
    'RedHatDisplay-SemiBold': require('@/assets/fonts/RedHatDisplay-SemiBold.ttf'),
    'RedHatDisplay-Bold': require('@/assets/fonts/RedHatDisplay-Bold.ttf'),
    'RedHatDisplay-ExtraBold': require('@/assets/fonts/RedHatDisplay-ExtraBold.ttf'),
    'RedHatDisplay-Black': require('@/assets/fonts/RedHatDisplay-Black.ttf'),
  });

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.panel },
        }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="drop-ai" options={{ animation: 'slide_from_bottom' }} />
      </Stack>
    </SafeAreaProvider>
  );
}
