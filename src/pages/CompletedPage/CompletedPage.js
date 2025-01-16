import { appendTaskToUI } from "../../dom";
import ProjectList from "../../modules/projectList/projectList";

export default function loadCompleted() {

    ProjectList.getAllProjects().forEach((project) => {
        project.getList().getList()
            .filter(task => task.completed)
            .forEach((task) => {
            const taskWithProject = {
                ...task,
                projectName: project.getName(),
            };
            appendTaskToUI(taskWithProject);
            });
    });
}
