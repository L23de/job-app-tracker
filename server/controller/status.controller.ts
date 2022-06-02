import StatusRepository from "../repository/status.repository";
import defaultController from "./default.controller";

export default class StatusController extends defaultController {

	constructor(db: any) {
		super();
		this.repository = new StatusRepository(db);
	}

	async getStatuses() {
		this.logger.info('Controller: getStatuses', null);
		return await this.repository.getStatuses();
	}

	async getStatus(id: number) {
		this.logger.info(`Controller: getStatus(${id})`, null);
		return await this.repository.getStatus(id);
	}

	async createStatus(status: any) {
		this.logger.info('Controller: createStatus', null);
		return await this.repository.createStatus(status);
	}

	async updateStatus(id: number, newStatus: any) {
		this.logger.info('Controller: updateStatus', null);
		return await this.repository.updateStatus(id, newStatus);
	}

};