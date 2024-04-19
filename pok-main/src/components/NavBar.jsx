import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar'; 
import logo from '../assets/pokemon-logo.png'; 

function NavBar(props) {
    return (
        <nav className="fixed w-full top-0 flex items-center justify-between flex-wrap bg-blue-500 p-4 z-50">
            <div className="flex items-center flex-shrink-0 text-white mr-2">
                <img src={logo} alt="Pokemon Logo" className="h-8 w-auto" /> 
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-md text-sky-50 lg:flex-grow">
                    <Link to="/" className="block mt-4 font-extrabold lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                        POKEMON {"241"}
                    </Link>
                </div>
                <div>
                    <SearchBar onSearch={props.onSearch} />
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
