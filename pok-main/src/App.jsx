import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';

class App extends React.Component {
    render() {
        return (
            
            <Router>
                <Routes>
                    <Route path="/" element={<PokemonList />} />
                    <Route path="/pokemon/:id" element={<PokemonDetails />} />
                </Routes>
            </Router>
        );
    }
}

export default App;
