import defaultController from './default.controller';
import { QueryTypes } from 'sequelize';

export default class JobController extends defaultController {

    private sequelize: any;
    private jobs: any;
    private statuses: any;
    // private init = false;
    private init = true;

    constructor(db: any) {
        super();
        this.sequelize = db.sequelize;
        this.jobs = db.jobRepository;
        this.statuses = db.statusRepository;
    }

    async getJobs() {
        // run only on the first fetch
        // check when force refresh of db
        if (!this.init) {
            console.log('setting up indices for the first time');
            await this.sequelize.query('create index job_status_index on "JobStatuses" ("jobId", "updatedAt")');
            await this.sequelize.query('cluster "JobStatuses" using job_status_index');
            this.init = true;
        }

        this.logger.info('Controller: getJobs', null);

        // used a normal SQL query bc sequelize doesn't seem to support subqueries well
        // src: https://stackoverflow.com/questions/7745609/sql-select-only-rows-with-max-value-on-a-column
        return await this.sequelize.query(
            `with job_status as (
                select "Jobs".id as jid, "company", "position", "notes", "Statuses".id as sid, "name", "color", "JobStatuses"."updatedAt" as "update" from 
                ("JobStatuses" join "Jobs" on "jobId" = "Jobs".id)
                join "Statuses" on "statusId" = "Statuses".id
            )
            select distinct on (jid) *
            from job_status order by jid, update desc`,
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
            console.log('jobs:::', data);
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
			console.log('job:::', status);
			return status;
		}).catch(err => {
			this.logger.error(err);
			return { error: err };
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
			return { error: err };
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
                return { error: err };
            });
    }

    async deleteJob(id: number) {
        this.logger.info(`Controller: deleteJob(${id})`, null);
        return await this.jobs.destroy({ 
            where: { id: id } 
        }).then(n => {
            console.log(`deleted ${n} row(s)`);
            return n;
        }).catch(err => {
            this.logger.error(err);
            return { error: err };
        });
    }

}