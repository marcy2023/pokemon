import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function PokemonDetails() {
    const [pokemon, setPokemon] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(response => {
                setPokemon(response.data);
            })
            .catch(error => {
                console.error("Error retrieving Pokémon details :", error);
            });
    }, [id]);

    if (!pokemon) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="m-4 p-5 bg-white shadow-md rounded-lg overflow-auto max-w-4/5 max-h-4/5">
                <h1 className="font-bold text-xl text-center mb-2">{pokemon.name}</h1>
                <img className="w-full h-52 object-cover" src={pokemon.sprites.front_default} alt={pokemon.name} />
                <div className="p-5 font-semibold">
                    <p>Taille: {pokemon.height / 10} m</p>
                    <p>Poids: {pokemon.weight / 10} kg</p>
                    <p>Types: {pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
                    <p>Statistiques de base:</p>
                    <ul>
                        {pokemon.stats.map(stat => (
                            <li key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</li>
                        ))}
                    </ul>
                </div>
                <Link to="/" className="block w-full py-2 px-4 rounded bg-blue-500 hover:bg-blue-700 focus:outline-none text-white text-center">Return to main list</Link>
            </div>
        </div>
    );
}

export default PokemonDetails;
