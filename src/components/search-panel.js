import React from 'react';

const SearchPanel = () => {
    const searchText = 'Type here to search'
    const searchStyle = {
        fontsize: '100px'
    }
    return (
        <input
            style={searchStyle}
            placeholder={searchText}/>
    );
};

export default SearchPanel;