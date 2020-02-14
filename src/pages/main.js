import React, { Component } from 'react';
import api from '../services/api';
import pokemonSprites from '../services/pokemonSprites'
import { View, Image, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";

export default class Main extends Component {
    static navigationOptions = {
        title: "Pokedex"
    };

    state = {
        productInfo: {},
        results: [],
        // page: 1,
        offSet: 0,
        limit: 20,
        ImageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"
    };

    componentDidMount() {
        this.loadPokemons();
        this.loadPokemonsSprites();

    }
    loadPokemonsSprites = async () => {
        // const response = await pokemonSprites.get(`132.jpg`);

    }

    loadPokemons = async (offSet = 0) => {
        const response = await api.get(`/pokemon?offset=${offSet}&limit=${this.state.limit}`);

        const { results, ...productInfo } = response.data;

        this.setState({
            results: [...this.state.results, ...results],
            productInfo,
            offSet

        })
    };

    loadMore = () => {
        const { offSet, productInfo } = this.state;
        // Pages 'a variavel de numero maximo de paginas nessa api utlizada como exemplo
        if (productInfo.next == null) return;

        const offSetNumber = offSet + this.state.limit;

        this.loadPokemons(offSetNumber);
    }


    takeIdFromUrl = (baseURL) => {
        const id = baseURL.replace("https://pokeapi.co/api/v2/pokemon/", "").replace("/", "");
        return id;
    }


    renderItem = ({ item }) => (
        <View style={styles.productContainer}>
            <Text style={styles.pokemonName}>{this.takeIdFromUrl(item.url)}-{item.name}</Text>
            {/* <Text style={styles.productDescription}>{item.description}</Text> */}
            <Image
                style={styles.Image}
                source={{ uri: this.state.ImageUrl + this.takeIdFromUrl(item.url) + ".png" }}
            />
            <TouchableOpacity style={styles.productButton}
                onPress={() => {
                    this.props.navigation.navigate("Pokemon", { pokemon: item })
                }}
            >
                <Text style={styles.productButtonText}>Detalhes do Pokemon</Text>
            </TouchableOpacity>
        </View>
    );
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    contentContainerStyle={styles.list}
                    data={this.state.results}
                    keyExtractor={item => item.url}
                    renderItem={this.renderItem}
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={0.3}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FF6347"
    },
    list: {
        padding: 20
    },
    productContainer: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 5,
        padding: 20,
        marginBottom: 20,
    },
    pokemonName: {
        textTransform: 'capitalize',
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    productDescription: {
        fontSize: 16,
        color: "#999",
        marginTop: 5,
        lineHeight: 24
    },
    productButton: {
        height: 42,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#B22222",
        backgroundColor: "#B22222",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    productButtonText: {
        fontSize: 16,
        color: "#FFFAF0",
        fontWeight: "bold"
    },
    Image: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 150,
        width: 150,

    }

});