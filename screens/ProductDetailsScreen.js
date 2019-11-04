import React from 'react';
import { ActivityIndicator, Text, View, Image, StyleSheet } from 'react-native';
import { Thumbnail, } from 'native-base';

export default class ProductDetailsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state =
            {
                isLoading: true,
                fontLoaded: false,
            }
    }

    async componentDidMount() {
        const { navigation } = this.props;

        fetch('https://world.openfoodfacts.org/api/v0/product/' + navigation.getParam('productCode') + '.json')
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    dataSource: responseJson.product,
                }, function () {
                });

            })
            .catch((error) => {
                console.error(error);
            });


    }

    render() {
        const { navigation } = this.props;
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }
        return (
            <View style={{ flex: 1, paddingTop: 20, backgroundColor: 'aliceblue', }}>
                <View style={{ flexDirection: 'row', marginLeft: 10, backgroundColor: 'white', paddingTop: 20, paddingBottom: 20 }}>
                    <Thumbnail square large style={{ height: 190, width: 190 }} source={{ uri: this.state.dataSource.image_url }} />
                    <View style={{ flexDirection: 'column', flex: 2, paddingLeft: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, }}>{this.state.dataSource.product_name_fr} {this.state.dataSource.brands}</Text>
                        <View style={{ marginTop: 10, }}>
                            <Text style={{ fontSize: 20 }}>{this.state.dataSource.brands}</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: "center"}}>
                            <View style={this.state.dataSource.nutriments["nutrition-score-fr"] < 40 ? styles.redcircle : styles.greencircle } />
                            <Text style={{ fontSize: 20, marginTop: 10, fontWeight: "bold", color: this.state.dataSource.nutriments["nutrition-score-fr"] < 40 ? "red" : "green" }}>{this.state.dataSource.nutriments["nutrition-score-fr"]}/100</Text>
                        </View>
                        <Text>{this.state.dataSource.nutriments["nutrition-score-fr"] < 40 ? "Mauvais" : "Bon"}</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: 'white', marginTop: 10, padding: 10, }}>
                    <Text style={{ fontWeight: 'bold' }}>Valeurs nutrionnelles (pour 100g)</Text>
                    <View style={{ flexDirection: 'row', justifyContent: "space-around", marginTop: 30 }}>
                        <View>
                            <Image
                                style={styles.icon}
                                source={require('../assets/images/candy.png')}
                            />
                            <Text style={styles.nutri}>{this.state.dataSource.nutriments.sugars_100g.toFixed(2)} {this.state.dataSource.nutriments.sugars_unit}</Text>
                        </View>
                        <View>
                            <Image
                                style={styles.icon}
                                source={require('../assets/images/salt.png')}
                            />
                            <Text style={styles.nutri}>{this.state.dataSource.nutriments.salt_100g.toFixed(2)} {this.state.dataSource.nutriments.salt_unit}</Text>
                        </View>
                        <View>
                            <Image
                                style={styles.icon}
                                source={require('../assets/images/burger.png')}
                            />
                            <Text style={styles.nutri}>{this.state.dataSource.nutriments.fat_100g.toFixed(2)} {this.state.dataSource.nutriments.fat_unit}</Text>
                        </View>
                    </View>
                    <View>
                    </View>
                </View>
            </View >
        );
    }
}
const styles = StyleSheet.create({
    icon: {
        width: 80, height: 80,
    },
    nutri: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
    },
    redcircle: {
        width: 20,
        height: 20,
        borderRadius: 100/2,
        backgroundColor: 'red',
    },
    greencircle: {
        width: 20,
        height: 20,
        borderRadius: 100/2,
        backgroundColor: 'green'
    }
})
