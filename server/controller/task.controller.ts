import { APILogger } from '../logger/api.logger';
import { TaskRepository } from '../repository/task.repository';

export class TaskController {

    private taskRepository: TaskRepository;
	private logger: APILogger;

    constructor(db: any) {
        this.taskRepository = new TaskRepository(db);
        this.logger = new APILogger();
    }

    async getTasks() {
        this.logger.info('Controller: getTasks', null)
        return await this.taskRepository.getTasks();
    }

    async createTask(task) {
        this.logger.info('Controller: createTask', task);
        return await this.taskRepository.createTask(task);
    }

    async updateTask(task) {
        this.logger.info('Controller: updateTask', task);
        return await this.taskRepository.updateTask(task);
    }

    async deleteTask(taskId) {
        this.logger.info('Controller: deleteTask', taskId);
        return await this.taskRepository.deleteTask(taskId);
    }

};
