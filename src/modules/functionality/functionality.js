import { saveToLocalStorage } from "../../storage";
import ProjectList from "../../modules/projectList/projectList";


let projectId = "";

export function appendTaskToUI(task) {
    // Create the task container
    const taskContainer = document.createElement("div");
    taskContainer.className = "task-container";
    taskContainer.setAttribute("data-task-id", task.id); // Set task ID for future reference

    // Add title
    const title = document.createElement("h2");
    title.textContent = task.title;
    taskContainer.appendChild(title);

    // Add description
    const description = document.createElement("p");
    description.textContent = task.description;
    taskContainer.appendChild(description);

    // Add due date
    const dueDate = document.createElement("p");
    dueDate.textContent = `Due Date: ${task.dueDate}`;
    taskContainer.appendChild(dueDate);

    // Add priority
    const priority = document.createElement("p");
    priority.textContent = `Priority: ${task.priority}`;
    taskContainer.appendChild(priority);

    // Add completed checkbox
    const completedCheckbox = document.createElement("input");
    completedCheckbox.type = "checkbox";
    completedCheckbox.checked = task.completed;

    completedCheckbox.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent the click event from bubbling up to the parent container
    });

    completedCheckbox.addEventListener("change", () => {
        task.completed = completedCheckbox.checked;
        saveToLocalStorage();
    });
    taskContainer.appendChild(completedCheckbox);

    // Add delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.className = "delete-task";
    deleteButton.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent triggering the task click event
        deleteTask(task.id);
    });
    taskContainer.appendChild(deleteButton);

    taskContainer.addEventListener("click", () => {
        openEditModal(task);
    });

    // Append to task list
    document.getElementById("task-list").appendChild(taskContainer);
}

export function openEditModal(task) {
    const modal = document.getElementById("task-modal");
    if (!modal) {
        console.error("Task modal not found!");
        return;
    }

    const form = modal.querySelector("form");
    form.querySelector("[name='mode']").value = "edit"; // Set mode to edit
    form.querySelector("[name='taskId']").value = task.id;
    form.querySelector("[name='title']").value = task.title;
    form.querySelector("[name='description']").value = task.description;
    form.querySelector("[name='dueDate']").value = task.dueDate;

    const priorityRadios = form.querySelectorAll("[name='val']");
    priorityRadios.forEach(radio => {
        radio.checked = radio.value === task.priority;
    });

    modal.showModal();
}

export function updateTaskInUI(task) {
    const taskContainer = document.querySelector(`.task-container[data-task-id='${task.id}']`);
    if (!taskContainer) {
        console.error(`Task container for task ID ${task.id} not found!`);
        return;
    }

    // Update the task details in the UI
    taskContainer.querySelector("h2").textContent = task.title;
    taskContainer.querySelector("p:nth-of-type(1)").textContent = `Description: ${task.description}`;
    taskContainer.querySelector("p:nth-of-type(2)").textContent = `Due Date: ${task.dueDate}`;
    taskContainer.querySelector("p:nth-of-type(3)").textContent = `Priority: ${task.priority}`;
}

export function deleteProject(projectId) {
    ProjectList.removeProject(projectId);
    saveToLocalStorage();
    document.querySelector(`.menu-item[data-project-id='${projectId}']`).remove();
}

export function deleteTask(taskId) {
    const projectId = document.getElementById("project-id").value;
    if (projectId === "0") {
        // Handle deletion from "All Tasks" page
        ProjectList.getAllProjects().forEach((project) => {
            project.getList().removeElement(taskId);
        });
    } else {
        const project = ProjectList.findProjectById(projectId);
        if (project) {
            project.getList().removeElement(taskId);
        }
    }
    document.querySelector(`.task-container[data-task-id='${taskId}']`).remove();
    saveToLocalStorage();
}

export function addProjectToUI(project) {
    const newProject = document.createElement("div");

    newProject.className = "menu-item";
    newProject.textContent = project.getName();
    newProject.setAttribute("data-project-id", project.id);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.className = "delete-project";
    deleteButton.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent triggering the project click event
        deleteProject(project.getId());
    });

    newProject.appendChild(deleteButton);

    newProject.addEventListener("click", (e) => {
        projectId = e.target.getAttribute("data-project-id");

        const project = ProjectList.findProjectById(projectId);

        const taskContainer = document.getElementById("task-list");
        taskContainer.innerHTML = "";

        if (!project) {
            console.error("Project not found or undefined for ID:", projectId);
            return;
        } else {
            project.getList().getList().forEach((task) => {
                appendTaskToUI(task);
            });
        }

        // Update the hidden input field with the projectId
        document.getElementById("project-id").value = projectId;
    });

    const allProjects = document.getElementById("proj-list");
    allProjects.appendChild(newProject);
    saveToLocalStorage();
}