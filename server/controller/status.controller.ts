import Status from "../model/status.model";
import defaultController from "./default.controller";

export default class StatusController extends defaultController {

	private statusRepository: any;

	constructor(db: any) {
		super();
		this.statusRepository = db.statusRepository;
	}

	async getStatuses() {
		this.logger.info('Controller: getStatuses', null);
		return await this.statusRepository.findAll()
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
		this.logger.info(`Controller: getStatus(${id})`, null);
		return await this.statusRepository.findOne({
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
		this.logger.info('Controller: createStatus', null);
		return await this.statusRepository.create(status)
			.then(data => data)
			.catch(err => {
				console.log(err);
				return { 'error': err };
			});
	}

	async updateStatus(id: number, newStatus: any) {
		this.logger.info('Controller: updateStatus', null);
		return await this.statusRepository.update(
			newStatus, 
			{ where: { id: id }}
		)
			.then(data => data)
			.catch(err => {
				console.log(err);
				return { 'error': err };
			});
	}

	async deleteStatus(id: number) {
		this.logger.info(`Controller: deleteStatus(${id})`, null)
		let n = await this.statusRepository.delete({ where: { id: id } });
		console.log(`deleted ${n} row(s)`);
		return n;
	}

};