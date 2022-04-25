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
        ]
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

    render(){
        const {todoData} = this.state;
        const doneCount = todoData.filter((elements)=> elements.done).length;
        const todoCount = todoData.length - doneCount
        return(
            <div className={"todo-app"}>
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className={"top-panel d-flex"}>
                    <SearchPanel/>
                    <ItemStatusFilter/>
                </div>
                <TodoList
                    todos={todoData}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />
                <ItemAddForm onItemAdded={this.addItem}/>
            </div>
        )
    }
};
