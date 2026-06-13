import { StatusBar } from 'expo-status-bar';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import useFetch from '../hooks/useFetch';
import { API_BASE } from '../constants/api';

interface Author {
  id: string;
  name: string;
  nationality: string;
}

export default function AuthorsScreen() {
  const { data, loading, error } = useFetch<Author[]>(`${API_BASE}/authors`);

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

  const authors = Array.isArray(data) ? data : [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>저자 목록</Text>
      <FlatList
        data={authors}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.name} — {item.nationality}
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
    paddingTop: 16,
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
