import ProjectList from "./modules/projectList/projectList";
import Project from "./modules/project/project";
import toDoItem from "./modules/todoItem/toDoItem";
import { addProjectToUI } from "./modules/functionality/functionality";

export function saveToLocalStorage() {
    const projects = ProjectList.getAllProjects().map((project) => {
        return {
            name: project.getName(),
            id: project.getId(),
            toDoList: project.getList().getList(), // Serialize the toDoList
        };
    });

    localStorage.setItem("projects", JSON.stringify(projects));
}


export function loadFromLocalStorage() {
    const serializedData = localStorage.getItem("projects");
    if (!serializedData) return;

    const projects = JSON.parse(serializedData);

    projects.forEach((projectData) => {
        const project = new Project(projectData.name, projectData.id);

        if (!projectData || projectData.id === 0) return;

        // Iterate through tasks in the project's toDoList
        projectData.toDoList.forEach((taskData) => {
            const task = new toDoItem(
                taskData.title,
                taskData.description,
                taskData.dueDate,
                taskData.priority,
                taskData.id,
                taskData.completed
            );
            project.getList().addToDo(task); // Add tasks to the project's toDoList
        });

        ProjectList.addProject(project); // Add the project to the ProjectList
        addProjectToUI(project); // Render the project in the UI
    });
}



document.addEventListener("DOMContentLoaded", () => {
    loadFromLocalStorage();
});

