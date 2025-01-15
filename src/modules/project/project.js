import toDoList from "../toDoList/toDoList";

export default class project{
    constructor(name, id){
        this.name = name;
        this.id = id

        this.toDoList = new toDoList();
    }

    getName(){
        return this.name;
    }

    getList(){
        return this.toDoList;
    }

    getId(){
        return this.id;
    }
}