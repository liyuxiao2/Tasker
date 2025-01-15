import toDoItem from "../todoItem/toDoItem";

export default class toDoList{
    constructor(){
        this.listOfToDo = [];
        this.counter = 1;
    }

    addToDo(newToDo){
        if (!(newToDo instanceof toDoItem)) {
            throw new TypeError('Parameter must be of type ToDoItem');
        }
        this.listOfToDo.push(newToDo);
        this.counter += 1;
    }

    findId(element, toDoId){
        return element.Id === toDoId;
    }

    removeElement(toDoId){
        this.listOfToDo = this.listOfToDo.filter((element) => !this.findId(element, toDoId));
        this.counter -= 1;
    }

    getCount(){
        return this.counter;
    }

    getList(){
        return this.listOfToDo;
    }
}