import { StatusBar } from 'expo-status-bar';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import useFetch from './hooks/useFetch';

const API_BASE = Platform.select({
  android: 'http://10.0.2.2:3000',
  ios: 'http://localhost:3000',
  default: 'http://localhost:3000',
});

export default function App() {
  const { data, loading, error } = useFetch(`${API_BASE}/books`);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <StatusBar style="auto" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>에러: {error}</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  const books = Array.isArray(data) ? data : [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>책 목록</Text>
      <FlatList
        data={books}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.title} ({item.year})
          </Text>
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 48,
    paddingHorizontal: 16,
  },
  center: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    fontSize: 16,
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  error: {
    color: 'crimson',
    fontSize: 16,
  },
});
