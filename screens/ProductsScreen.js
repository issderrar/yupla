import React from 'react';
import ProductsList from '../components/ProductsList';


export default class ProductsScreen extends React.Component {
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  render() {
  return <ProductsList navigation={this.props.navigation} >
  </ProductsList>
}
}
ProductsScreen.navigationOptions = {
  title: 'app.json',
};

