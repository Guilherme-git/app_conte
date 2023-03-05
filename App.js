
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import Stack from './src/navigation'

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack />
    </NavigationContainer>

  );
}

