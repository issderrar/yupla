import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import ProductsScreen from '../screens/ProductsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    ProductDetails: ProductDetailsScreen,

  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Scanner',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeStack.path = '';






const ProductsStack = createStackNavigator(
  {
    Products: ProductsScreen,
    ProductDetails: ProductDetailsScreen,
  },
  config
);

ProductsStack.navigationOptions = {
  tabBarLabel: 'Produits',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

ProductsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  ProductsStack,
});

tabNavigator.path = '';

export default tabNavigator;
