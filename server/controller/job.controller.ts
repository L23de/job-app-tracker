import defaultController from './default.controller';
import JobRepository from '../repository/job.repository';

export default class JobController extends defaultController {

    constructor(db: any) {
        super();
        this.repository = new JobRepository(db);
    }

    async getTasks() {
        this.logger.info('Controller: getJobs', null)
        return await this.repository.getJobs();
    }

}