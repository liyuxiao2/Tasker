import ProjectList from "./modules/projectList/projectList";
import Project from "./modules/project/project";
import toDoItem from "./modules/todoItem/toDoItem";
import { saveToLocalStorage } from "./storage";
import { appendTaskToUI, updateTaskInUI, addProjectToUI } from "./modules/functionality/functionality";

import loadAllTasks from "./pages/allTasksPage/allTasks";

const body = document.getElementById("container");

const closeButtons = document.querySelectorAll("#closeBtn");

const addButtons = document.querySelectorAll(".add");

const submitButtons = document.querySelectorAll("#confirmBtn");

const allTasksButton = document.getElementById("all-tasks");


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

            const form = modal.querySelector("form");
            form.querySelector("[name='mode']").value = "add"; // Set mode to edit

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

            addProjectToUI(project);

        } else if (form.id === "form2") {
            const taskTitle = form.querySelector("[name='title']").value;
            const taskDescription = form.querySelector("[name='description']").value;
            const taskDueDate = form.querySelector("[name='dueDate']").value;
            const taskPriority = form.querySelector("[name='val']:checked").value;

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

// Handle "All Tasks" page
allTasksButton.addEventListener("click", () => {
    projectId = "0"; // Set projectId to "0" for "All Tasks" page
    document.getElementById("project-id").value = projectId;
    const taskContainer = document.getElementById("task-list");
    taskContainer.innerHTML = ""; // Clear the task list
    loadAllTasks(); // Load all tasks
});