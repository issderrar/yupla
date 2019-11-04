import React from 'react';
import { FlatList, ActivityIndicator, View, Text, StyleSheet, Image } from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Left, Body, Right, Button } from 'native-base';

export default class ProductsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            isLoading: true, 
        }
    }

    onPress = (item) => {

        this.props.navigation.navigate({
            routeName: 'ProductDetails',
            params: {
                productCode: item.code,
            },

        })
    }
    
    componentDidMount() {
        return fetch('https://fr-en.openfoodfacts.org/category/candies.json')
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    dataSource: responseJson.products,
                }, function () {
                });

            })
            .catch((error) => {
                console.error(error);
            });
    }



    render() {

        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }
        return (
            <View style={{ flex: 1, paddingTop: 20 }}>
                <Container>
                    <Content>
                        <FlatList
                            data={this.state.dataSource}
                            renderItem={({ item }) =>
                                <ListItem thumbnail button
                                onPress={() => { this.onPress(item) }}>
                                    <Left>
                                        <Thumbnail source={{ uri: item.image_url }} />
                                    </Left>
                                    <Body>
                                        <Text style={{ fontWeight: 'bold', fontSize: 15,}}>{item.product_name_fr}</Text>
                                        <Text note numberOfLines={1}>{item.brands}</Text>
                                    </Body>
                                </ListItem>
                            }
                            keyExtractor={({ id }, index) => id}
                        />
                    </Content>
                    </Container>
            </View>
                );
            }
        }
const styles = StyleSheet.create({
                    container: {
                    flex: 1,
                justifyContent: 'center',
                paddingHorizontal: 10,
            },
    button: {
                    alignItems: 'center',
                backgroundColor: 'skyblue',
                padding: 10,
                flexDirection: 'row',
            },
})