import { appendTaskToUI } from "../../dom";
import ProjectList from "../../modules/projectList/projectList";

export default function loadAllTasks() {

    ProjectList.getAllProjects().forEach((project) => {
        project.getList().getList().forEach((task) => {
            const taskWithProject = {
                ...task,
                projectName: project.getName(), // Add project name for identification
            };
            appendTaskToUI(taskWithProject);
        });
    });
}
