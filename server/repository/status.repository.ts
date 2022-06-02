import { APILogger } from "../logger/api.logger";
import * as Models from "../model";
import defaultRepository from "./default.repository";

export default class StatusRepository extends defaultRepository {

	constructor(db: any) {
		super(db, Models.Status);
	}

	async getStatuses() {
		return await this.repository.findAll()
			.then(statuses => {
				console.log('statuses:::', statuses);
				return statuses;
			})
			.catch(err => {
				console.log(err);
				return { 'error': err };
			});
	}

	async getStatus(id: number) {
		return await this.repository.findOne({
			where: { id: id }
		}).then(status => {
			console.log('status:::', status);
			return status;
		}).catch(err => {
			console.log(err);
			return { 'error': err };
		});
	}

	async createStatus(status: any) {
		return await this.repository.create(status)
			.then(data => data)
			.catch(err => {
				console.log(err);
				return { 'error': err };
			});
	}

	async updateStatus(id: number, newStatus: any) {
		return await this.repository.update(
			newStatus, 
			{ where: { id: id }}
		)
			.then(data => data)
			.catch(err => {
				console.log(err);
				return { 'error': err };
			});
	}

	async deleteStatus(id) {
		let n = await this.repository.delete({ where: { id: id } });
		console.log(`deleted ${n} row(s)`);
		return n;
	}

};
