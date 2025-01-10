import { projectList } from "../modules/export";

export default function createProjectPage(content, id){

    const project = projectList.findProjectById(id);


    // Set the title or heading for the project
    const projectTitle = document.createElement('h1');
    projectTitle.textContent = project.name;
    content.appendChild(projectTitle);

    // Create a container for tasks
    const taskContainer = document.createElement('div');
    taskContainer.className = 'task-container';


    // Append the task container to the content
    content.appendChild(taskContainer);
}