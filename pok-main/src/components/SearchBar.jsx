import React from 'react';

class SearchBar extends React.Component {
    state = {
        searchTerm: '',
    };

    handleInputChange = (event) => {
        this.setState({
            searchTerm: event.target.value,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSearch(this.state.searchTerm);
        
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit} className='flex gap-2'>
                <input
                    type="text" className='p-2 rounded '
                    value={this.state.searchTerm}
                    onChange={this.handleInputChange}
                />
                <button type="submit" className='bg-green-500 p-2 rounded text-white'>Research</button>
            </form>
        );
    }
}

export default SearchBar;
