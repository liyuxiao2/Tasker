import "./styles.css";

import"./dom";

import "./modules/functionality/functionality";

import "./storage";

import loadAllTasks from "./pages/allTasksPage/allTasks";

import loadCompleted from "./pages/CompletedPage/CompletedPage";



const content = document.getElementById("task-list");

const nav = document.getElementById("menu");



loadAllTasks(content);

nav.addEventListener("click", (e) => {
    const target = e.target.id;

    switch (target){
        case "all-tasks":
            content.textContent = "";
            loadAllTasks(content);
            break;
        case "completed":
            content.textContent = "";
            loadCompleted(content);
            break;
    }
}) 
