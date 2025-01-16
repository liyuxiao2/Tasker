export default class toDoItem{
    constructor(title, description, dueDate, priority, id, completed = false){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.id = id;
        this.completed = completed;
    }

    //Edit a todo’s details.
    editTitle(newTitle){
        this.title = newTitle;
    }

    editDescription(newDescription){
        this.description = newDescription;
    }

    editdueDate(newdueDate){
        this.dueDate = newdueDate;
    }

    editPriority(newPriority){
        this.priority = newPriority;
    }

    editCompleted(){
        this.completed = !this.completed;
    }
    
    get Id(){
        return this.id;
    }
}