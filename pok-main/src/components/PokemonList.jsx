import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavBar from './NavBar'; 
import InfiniteScroll from 'react-infinite-scroll-component'; // Importation de la bibliothèque de défilement infini

class PokemonList extends React.Component {
    state = {
        pokemons: [],
        searchTerm: '',
        count: 0, // compteur pour suivre le nombre de Pokémon chargés
        hasMore: true, //booléen pour savoir s'il y a plus de Pokémon à charger
    };

    handleSearch = (searchTerm) => {
        this.setState({ searchTerm });
    }

    componentDidMount() {
        this.fetchMoreData(); // Chargement des premiers Pokémon lors du montage du composant
    }

    fetchMoreData = () => {
        // Si tous les Pokémon ont été chargés, mettez à jour l'état pour arrêter le chargement de plus de données
        if (this.state.count >= 1026) {
            this.setState({ hasMore: false });
            return;
        }

        // Chargement de 10 Pokémon à la fois
        axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${this.state.count}&limit=10`)
            .then(response => {
                this.setState({
                    pokemons: [...this.state.pokemons, ...response.data.results],
                    count: this.state.count + 10,
                });
            })
            .catch(error => {
                console.error("Error retrieving Pokémon list :", error);
            });
    }

    render() {
        const filteredPokemons = this.state.pokemons.filter((pokemon, index) => {
            return pokemon.name.includes(this.state.searchTerm) || String(index + 1).includes(this.state.searchTerm);
        });

        if (filteredPokemons.length === 0) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <NavBar onSearch={this.handleSearch} /> {/* Passez la fonction handleSearch à NavBar */}
                <InfiniteScroll
                    dataLength={this.state.pokemons.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.hasMore}
                    loader={<h4>Loading...</h4>}
                    style={{ paddingTop: '94px' }}
                >
                    <div className="flex flex-wrap justify-center bg-neutral-600">
                        {filteredPokemons.map((pokemon, index) => (
                            <div key={pokemon.name} className="m-4 p-4 text-center bg-sky-50 shadow-md rounded-lg overflow-hidden max-w-xs">
                                <h2 className="font-bold text-xl mb-2">{`#${index + 1} ${pokemon.name}`}</h2>
                                <img className="w-full  object-cover" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} alt={pokemon.name} />
                                <Link className="text-blue-500 bg-fuchsia-100 py-2 border-dashed px-4 rounded-2 my-3 shadow hover:text-green-700" to={`/pokemon/${index + 1}`}>pokemon details</Link>
                            </div>
                        ))}
                    </div>
                </InfiniteScroll>
            </div>
        );
    }
}

export default PokemonList;
