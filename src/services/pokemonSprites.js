import axios from 'axios'

const api = axios.create({
    baseURL: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'
});

export default api;
