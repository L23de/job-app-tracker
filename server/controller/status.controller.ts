import Status from "../model/status.model";
import defaultController from "./default.controller";

export default class StatusController extends defaultController {

	private statuses: any;

	constructor(db: any) {
		super();
		this.statuses = db.statusRepository;
	}

	async getStatuses() {
		this.logger.info('Controller: getStatuses', null);
		return await this.statuses.findAll()
			.then(statuses => {
				console.log('statuses:::', statuses);
				return statuses;
			})
			.catch(err => {
				console.log(err);
				return { error: err };
			});
	}

	async getStatus(id: number) {
		this.logger.info(`Controller: getStatus(${id})`, null);
		return await this.statuses.findOne({
			where: { id: id }
		}).then(status => {
			console.log('status:::', status);
			return status;
		}).catch(err => {
			console.log(err);
			return { error: err };
		});
	}

	async createStatus(status: any) {
		this.logger.info('Controller: createStatus', null);
		return await this.statuses.create(status)
			.then(data => data)
			.catch(err => {
				console.log(err);
				return { error: err };
			});
	}

	async updateStatus(id: number, newStatus: any) {
		this.logger.info(`Controller: updateJob(${id})`, null);
		return await this.statuses.update(
			newStatus, 
			{ where: { id: id }}
		)
			.then(data => data)
			.catch(err => {
				console.log(err);
				return { error: err };
			});
	}

	async deleteStatus(id: number) {
		this.logger.info(`Controller: deleteStatus(${id})`, null);
		return await this.statuses.destroy({ 
            where: { id: id } 
        }).then(n => {
            console.log(`deleted ${n} row(s)`);
            return n;
        }).catch(err => {
            this.logger.error(err);
            return { error: err };
        });
	}

};