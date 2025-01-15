

export default class ProjectList {
    // Static array to hold all projects
    static projects = [];

    // Method to add a new project
    static addProject(project) {
        if (!project || !project.name) {
            throw new Error("Invalid project: A valid project object with a name is required.");
        }

        this.projects.push(project);
        console.log(this.projects.length);
    }

    // Method to remove a project by name
    static removeProject(projectName) {
        const initialLength = this.projects.length;
        this.projects = this.projects.filter(project => project.name !== projectName);

        if (this.projects.length === initialLength) {
            throw new Error(`No project found with the name "${projectName}".`);
        }
    }

    // Method to retrieve all projects
    static getAllProjects() {
        return this.projects;
    }

    // Method to find a project by name
    static findProjectById(projectId) {
        const project = this.projects.find(project => project.getId() === parseInt(projectId));

        if (!project) {
            console.error(`Project with ID ${projectId} not found.`);
            return null; // Explicitly return null if not found
        }

        return project;
    }

    static getCount(){
        return this.projects.length;
    }
}
