import React, {Component} from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from "../item-add-form";
import './app.css';

export default class App extends Component{

    maxId =100;

    state = {
        todoData: [
            this.creatTodoItem('Drink coffee'),
            this.creatTodoItem('Make Awesome App'),
            this.creatTodoItem('Have a lunch')
        ],
        term:'',
        filter:'all'
    };

    creatTodoItem(label){
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    deleteItem = (id) => {
        this.setState(({todoData})=>{
            const idX = todoData.findIndex((elements)=> elements.id === id);
            const newArray = [...todoData.splice(0, idX), ...todoData.slice(idX + 1)]
            return{
                todoData: newArray
            }
        })
    }

    addItem = (text) => {
        const newItem = this.creatTodoItem(text)
        this.setState(({todoData})=>{
            const newArray = [...todoData, newItem];
            return{
              todoData: newArray
            }
        });
    };

    toggleProperty(array, id, propertyName){
        const idX = array.findIndex((elements)=> elements.id === id);
        const oldItem = array[idX];
        const newItem = {...oldItem, [propertyName]: !oldItem[propertyName]}
        return [...array.splice(0, idX), newItem, ...array.slice(idX + 1)];
    }

    onToggleImportant = (id) => {
        this.setState(({todoData})=>{
            return {
                todoData: this.toggleProperty(todoData,id,'important')
            }
        });
    };

    onToggleDone = (id) => {
        this.setState(({todoData})=>{
            return {
                todoData: this.toggleProperty(todoData,id,'done')
            }
        });
    };

    onSearchChange = (term) => {
        this.setState({term})
    }

    onFilterChange = (filter) => {
        this.setState({filter})
    }

    search (items, term) {
        if (term.length === 0){
            return items;
        }
        return items.filter((item)=>{
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
        })
    }

    filter(items, filter){
        switch (filter){
            case 'all':
                return items;
            case 'active':
                return items.filter((item)=> !item.done);
            case 'done':
                return items.filter((item)=> item.done);
            default:
                return items;
        }
    }

    render(){
        const {todoData, term, filter} = this.state;
        const visibleItems = this.filter(this.search(todoData, term), filter);
        const doneCount = todoData.filter((elements)=> elements.done).length;
        const todoCount = todoData.length - doneCount
        return(
            <div className={"todo-app"}>
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className={"top-panel d-flex"}>
                    <SearchPanel onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter filter={filter} onFilterChange={this.onFilterChange}/>
                </div>
                <TodoList
                    todos={visibleItems}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />
                <ItemAddForm onItemAdded={this.addItem}/>
            </div>
        )
    }
};
