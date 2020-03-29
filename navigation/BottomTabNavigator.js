import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import TabBarIcon from '../components/TabBarIcon';
import GalleryScreen from '../screens/GalleryScreen';
import HomeScreen from '../screens/HomeScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Draw',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-brush" />,
        }}
      />
      <BottomTab.Screen
        name="Gallery"
        component={GalleryScreen}
        options={{
          title: 'Gallery',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-photos" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'Draw';
    case 'Gallery':
      return 'Gallery';
  }
}
