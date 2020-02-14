import React from 'react';
import { WebView } from 'react-native-webview';

const Pokemon = ({navigation}) => (
<WebView source={{uri:`https://www.pokemon.com/br/pokedex/${navigation.state.params.pokemon.name}`}}></WebView>
);

Pokemon.navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.pokemon.name
});
export default Pokemon;