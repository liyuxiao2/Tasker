import ProjectList from "./modules/projectList/projectList";
import Project from "./modules/project/project";
import toDoItem from "./modules/todoItem/toDoItem";
import { saveToLocalStorage } from "./storage";

const body = document.getElementById("container");

const closeButtons = document.querySelectorAll("#closeBtn");

const addButtons = document.querySelectorAll(".add");

const submitButtons = document.querySelectorAll("#confirmBtn");

const allProjects = document.getElementById("proj-list");

var projectId = "";

closeButtons.forEach((closeButton) => {
    closeButton.addEventListener("click", (e) => {
        const modal = e.target.closest("dialog");

        if(modal){
            const form = modal.querySelector("form");

            if(form){
                form.reset();
            }

            modal.close();
        }
    })
})

addButtons.forEach((addButton) => {
    addButton.addEventListener("click", (e) => {
        const modalId = e.target.getAttribute("data-modal");
        const modal = document.getElementById(modalId);

        if(modalId === "task-modal"){
            const currentProjectId = e.target.getAttribute("data-project-id");

            projectId = currentProjectId;
        }
        if(modal){
            modal.showModal();
        }
    })
})

submitButtons.forEach((submitButton) => {
    submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        const modal = e.target.closest("dialog");
        const form = modal.querySelector("form");
        
        if (form.id === "form1") {
            const projectName = form.querySelector("[name='title']").value;

            const project = new Project(projectName, ProjectList.getCount() + 1 );

            ProjectList.addProject(project);

            const newProject = document.createElement("div");

            newProject.className = "menu-item";
            newProject.textContent = project.getName();
            newProject.setAttribute('data-project-id', project.id);

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
                        const taskDiv = document.createElement("div");
                        taskDiv.className = "task";
                        taskDiv.textContent = task.title;
                        taskContainer.appendChild(taskDiv);
                    });
                }

                // Update the hidden input field with the projectId
                document.getElementById("project-id").value = projectId;
            });
            saveToLocalStorage();
            allProjects.appendChild(newProject);

        } else if (form.id === "form2") {
            const taskTitle = form.querySelector("[name='title']").value;
            const taskDescription = form.querySelector("[name='description']").value;
            const taskDueDate = form.querySelector("[name='dueDate']").value;
            const taskPriority = form.querySelector("[name='val']").value;

            // Retrieves projectId
            const projectId = form.querySelector("[name='projectId']").value;

            const mode = form.querySelector("[name='mode']").value;
            console.log(mode);

            const project = ProjectList.findProjectById(projectId);

            if (!project) {
                console.error("Project not found.");
                return;
            }

            if (mode === "add") {
                const task = new toDoItem(taskTitle, taskDescription, taskDueDate, taskPriority, project.getList().getCount()+1, false);

                project.getList().addToDo(task);

                appendTaskToUI(task);
                saveToLocalStorage();
            } else if (mode === "edit") {
                const taskId = form.querySelector("[name='taskId']").value;
                const task = project.getList().findId(taskId);

                if (task) {
                    task.title = taskTitle;
                    task.description = taskDescription;
                    task.dueDate = taskDueDate;
                    task.priority = taskPriority;
                    task.completed = taskCompleted;

                    updateTaskInUI(task);
                    saveToLocalStorage();
                } else {
                    console.error(`Task with ID ${taskId} not found in project ${projectId}`);
                }
            }
        }
        

        form.reset();
        modal.close();
    });
});

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


    taskContainer.addEventListener("click", () => {
        openEditModal(task);
    });

    const completedCheckbox = document.createElement("input");
    completedCheckbox.type = "checkbox";
    completedCheckbox.checked = task.completed;

    completedCheckbox.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent the click event from bubbling up to the parent container
    });

    completedCheckbox.addEventListener("change", () => {
        task.editCompleted();
        saveToLocalStorage();
    });
    taskContainer.appendChild(completedCheckbox);

    // Append to task list
    document.getElementById("task-list").appendChild(taskContainer);
}
function openEditModal(task) {
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
    form.querySelector(`[name='val'][value='${task.priority}']`).checked = true;

    const priorityRadios = form.querySelectorAll("[name='val']");
    priorityRadios.forEach(radio => {
        radio.checked = radio.value == task.priority;
    });
    
    modal.showModal();
}

function updateTaskInUI(task) {
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