import project from "../project/project";

export default class ProjectList {
    // Static array to hold all projects
    static projects = [];

    static initialize(){
        const allTasksProject = new project("allTasks", 0);
        ProjectList.addProject(allTasksProject);
    }
    // Method to add a new project
    static addProject(project) {
        if (!project || !project.name) {
            throw new Error("Invalid project: A valid project object with a name is required.");
        }

        ProjectList.projects.push(project); // Use ProjectList.projects instead of this.projects
    }

    static getAllProjects() {
        return ProjectList.projects; // Use ProjectList.projects
    }

    static findProjectById(projectId) {
        return ProjectList.projects.find(project => project.getId() === parseInt(projectId));
    }

    static getCount() {
        return ProjectList.projects.length;
    }

    static removeProject(projectId) {
        ProjectList.projects = ProjectList.projects.filter(project => project.getId() !== parseInt(projectId));
    }


}

ProjectList.initialize();