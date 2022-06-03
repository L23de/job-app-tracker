import defaultController from './default.controller';
import JobRepository from '../repository/job.repository';
import { Job, Status } from '../model';
import { Model, Sequelize, UpdatedAt } from 'sequelize-typescript';
import { literal, Op, QueryTypes } from 'sequelize';

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
        this.logger.info('Controller: getJobs', null);

        // used a normal SQL query bc sequelize doesn't seem to support subqueries well
        // src: https://stackoverflow.com/questions/7745609/sql-select-only-rows-with-max-value-on-a-column
        return await this.sequelize.query(
            `with job_status as (
                select "Jobs".id as jid, "company", "position", "notes", "Statuses".id as sid, "name", "color", "JobStatuses"."updatedAt" as "update" from 
                ("JobStatuses" join "Jobs" on "jobId" = "Jobs".id)
                join "Statuses" on "statusId" = "Statuses".id
            )
            select A.* from job_status as A
                left outer join job_status as C
                on A.jid = C.jid and A.sid = C.sid and A.update < C.update
                where C.jid is null
                order by jid;`,
            { type: QueryTypes.SELECT }
        ).then((res: any[], meta) => {
            let data = [];
            res.forEach(element => {
                data.push({
                    id: element.jid,
                    company: element.company,
                    position: element.position,
                    currentStatus: {
                        id: element.sid,
                        name: element.name,
                        color: element.color,
                    },
                    updatedAt: element.update
                });
            });
            return data;
        }).catch(err => {
            this.logger.error(err);
            return { error: err };
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
			this.logger.error(err);
			return { 'error': err };
		});
    }

    async createJob(job: any) {
        this.logger.info('Controller: createJob', null);
        try {
            return await this.sequelize.transaction(async (t) => {
                const status = await this.statuses.findOne({
                    where: { id: job.statusId },
                    transaction: t 
                });
                const newJob = await this.jobs.create({
                    company: job.company,
                    position: job.position,
                    notes: job.notes
                }, { transaction: t });
                newJob.$add('statuses', [status]);
                return newJob;
            });
        } catch (err) {
			this.logger.error(err);
			return { 'error': err };
		}
    }

    async updateJob(id: number, newJob: any) {
        this.logger.info(`Controller: updateJob(${id})`, null);
        return await this.jobs.update(
            newJob,
            { where: { id: id } }
        )
            .then(data => data)
            .catch(err => {
                console.log(err);
                return { 'error': err };
            });
    }

    async deleteJob(id: number) {
        this.logger.info(`Controller: deleteJob(${id})`, null);
        try {
            let n = await this.jobs.destroy({ where: { id: id } })
            console.log(`deleted ${n} row(s)`);
            return n;
        } catch (err) {
            this.logger.error(err);
            return { error: err };
        }
    }

}