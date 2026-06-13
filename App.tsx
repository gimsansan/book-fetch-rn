import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BooksScreen from './screens/BooksScreen';
import AuthorsScreen from './screens/AuthorsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Books" component={BooksScreen} />
        <Tab.Screen name="Authors" component={AuthorsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
