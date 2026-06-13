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

interface Book {
  id: string;
  title: string;
  authorId: string;
  year: number;
}

export default function BooksScreen() {
  const { data, loading, error } = useFetch<Book[]>(`${API_BASE}/books`);

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
