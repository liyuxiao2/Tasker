export default class toDoItem{
    constructor(title, description, dueDate, priority, id){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.id = id;
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

    get Id(){
        return this.id;
    }
}