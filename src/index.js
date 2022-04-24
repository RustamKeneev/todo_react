import React from 'react';
import ReactDom from 'react-dom';

const TodoList = () => {
    const items = ['Learn React','Build Awesome App']
    return (
        <ul>
            <li>{items[0]}</li>
            <li>{items[1]}</li>
        </ul>
    );
};

const AppHeader = () => {
    return(
        <h1>My Todo List</h1>
    );
};

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


const App = () => {
    return(
        <div>
            <AppHeader/>
            <SearchPanel/>
            <TodoList/>
        </div>
    );
};

ReactDom.render(<App/>, document.getElementById('root'));