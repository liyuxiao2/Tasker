import ProjectList from "./modules/projectList/projectList";
import Project from "./modules/project/project";
import toDoItem from "./modules/todoItem/toDoItem";
import { appendTaskToUI } from "./dom";

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


export function addProjectToUI(project) {
    const newProject = document.createElement("div");

    newProject.className = "menu-item";
    newProject.textContent = project.getName();
    newProject.setAttribute("data-project-id", project.getId());

    newProject.addEventListener("click", (e) => {
        const selectedProjectId = e.target.getAttribute("data-project-id");
        const selectedProject = ProjectList.findProjectById(selectedProjectId);

        const taskContainer = document.getElementById("task-list");
        taskContainer.innerHTML = "";

        if (!selectedProject) {
            console.error("Project not found or undefined for ID:", selectedProjectId);
            return;
        }

        selectedProject.getList().getList().forEach((task) => {
            appendTaskToUI(task);
        });

        document.getElementById("project-id").value = selectedProjectId;
    });

    const allProjects = document.getElementById("proj-list");
    allProjects.appendChild(newProject);
}


document.addEventListener("DOMContentLoaded", () => {
    loadFromLocalStorage();
});

