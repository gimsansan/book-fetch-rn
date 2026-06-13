import { Platform } from 'react-native';

export const API_BASE = Platform.select({
  android: 'http://10.0.2.2:3000',
  ios: 'http://localhost:3000',
  default: 'http://localhost:3000',
})!;
