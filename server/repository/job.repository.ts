import { Sequelize } from "sequelize/types";
import { APILogger } from '../logger/api.logger';
import * as Models from '../model';
import defaultRepository from "./default.repository";

export default class JobRepository extends defaultRepository {

	constructor(db: any) {
		super(db, Models.Job);
	}

	async getJobs() {
		try {
			const jobs = await this.repository.findAll();
			console.log('jobs:::', jobs);
			return jobs;
		} catch (err) {
			console.log(err);
			return [];
		}
	}

}