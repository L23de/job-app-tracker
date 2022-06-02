import { literal, Op, Sequelize } from "sequelize/types";
import { APILogger } from '../logger/api.logger';
import * as Models from '../model';
import defaultRepository from "./default.repository";

export default class JobRepository extends defaultRepository {

	public statusRepository: any;

	constructor(db: any) {
		super(db, Models.Job);
	}

	async getJobs() {
		return await this.repository.findAll()
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
		return await this.repository.findOne({
			where: { id: id },
			include: { model: this.statusRepository }
		}).then(status => {
			console.log('status:::', status);
			return status;
		}).catch(err => {
			console.log(err);
			return { 'error': err };
		});
	}

	async createJob(job: any) {
		try {
			const newJob = await this.repository.create({
				company: job.company,
				position: job.position,
				notes: job.notes
			});
			const status = await this.statusRepository.findOne({
				where: { id: job.statusId }
			});
			await newJob.setStatus(status);
			newJob.status = status;
			return newJob;
		} catch (err) {
			console.log(err);
			return { 'error': err };
		}
	}

}