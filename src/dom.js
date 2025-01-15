import ProjectList from "./modules/projectList/projectList";
import Project from "./modules/project/project";
import toDoItem from "./modules/todoItem/toDoItem";

const body = document.getElementById("container");

const closeButtons = document.querySelectorAll("#closeBtn");

const addButtons = document.querySelectorAll(".add");

const submitButtons = document.querySelectorAll("#confirmBtn");

const allTasks = [];

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
                }
                else{
                    project.getList().getList().forEach((task) => {
                        const taskDiv = document.createElement("div");
                        taskDiv.className = "task";
                        taskDiv.textContent = task.title;
                        taskContainer.appendChild(taskDiv);
                    });
                }

                document.getElementById("project-id").value = projectId;
            })

            
            allProjects.appendChild(newProject);

        } else if (form.id === "form2") {

            const taskTitle = form.querySelector("[name='title']").value;
            const taskDescription = form.querySelector("[name='description']").value;
            const taskDueDate = form.querySelector("[name='dueDate']").value;
            const taskPriority = form.querySelector("[name='val']").value;

            //retreives projectid
            const projectId = form.querySelector("[name='projectId']").value;
            
            
            const project = ProjectList.findProjectById(projectId)

            const task = new toDoItem(taskTitle, taskDescription, taskDueDate, taskPriority, project.getList().getCount());

            project.getList().addToDo(task);
            
            const taskElem = document.createElement("div");
            taskElem.className = "task";

            const title = document.createElement("h2");
            title.textContent = task.title;
            taskElem.appendChild(title);

            const description = document.createElement("p");
            description.textContent = task.description;
            taskElem.appendChild(description);

            const dueDate = document.createElement("p");
            dueDate.textContent = task.dueDate;
            taskElem.appendChild(dueDate);

            const priority = document.createElement("p");
            priority.textContent = task.priority;
            taskElem.appendChild(priority);

            document.getElementById("task-list").appendChild(taskElem);
        }


        form.reset();
        modal.close();
    });
});

