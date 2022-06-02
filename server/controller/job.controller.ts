import defaultController from './default.controller';
import JobRepository from '../repository/job.repository';
import { Job, Status } from '../model';
import { Model, Sequelize, UpdatedAt } from 'sequelize-typescript';
import { Op } from 'sequelize';

export default class JobController extends defaultController {

    private sequelize: any;
    private jobs: any;
    private statuses: any ;
    private jobStatuses: any;

    constructor(db: any) {
        super();
        this.sequelize = db.sequelize;
        this.jobs = db.jobRepository;
        this.statuses = db.statusRepository;
        this.jobStatuses = db.jobStatusRepository;
    }

    async getJobs() {
        this.logger.info('Controller: getJobs', null)
        return await this.jobs.findAll({
            include: { model: this.statuses }
        })
			.then(jobs => {
				console.log('jobs:::', jobs);
				return jobs;
			})
			.catch(err => {
				console.log(err);
				return { 'error': err };
			});
    }

    async getJob(id: number) {
        this.logger.info(`Controller: getJob(${id})`, null);
        return await this.jobs.findOne({
			where: { id: id },
			include: { model: this.statuses }
		}).then(status => {
			console.log('status:::', status);
			return status;
		}).catch(err => {
			console.log(err);
			return { 'error': err };
		});
    }

    async createJob(job: any) {
        this.logger.info('Controller: createJob', null);
        try {
            return await this.sequelize.transaction(async (t) => {
                const status = await this.statuses.findOne({
                    where: { id: job.statusId }
                }, { transaction: t });
                const newJob = await this.jobs.create({
                    company: job.company,
                    position: job.position,
                    notes: job.notes
                }, { transaction: t });
                newJob.$add('statuses', [status]);
                return newJob;
            });
        } catch (err) {
			console.log(err);
			return { 'error': err };
		}
    }

}