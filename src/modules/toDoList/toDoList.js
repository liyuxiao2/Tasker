import toDoItem from "../todoItem/toDoItem";

export default class toDoList{
    constructor(){
        this.listOfToDo = [];
    }

    addToDo(newToDo){
        if (!(newToDo instanceof toDoItem)) {
            throw new TypeError('Parameter must be of type ToDoItem');
        }
        this.listOfToDo.push(newToDo);
    }

    findId(toDoId) {
        return this.listOfToDo.find((element) => element.id === parseInt(toDoId));
    }

    

    removeElement(toDoId){
        this.listOfToDo = this.listOfToDo.filter((element) => !this.findId(element, toDoId));
    }

    getCount(){
        return this.listOfToDo.length;
    }

    getList(){
        return this.listOfToDo;
    }
}