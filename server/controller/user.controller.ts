import UserRepository from "../repository/user.repository";
import defaultController from "./default.controller";

export default class UserController extends defaultController {

	constructor(db: any) {
		super();
		this.repository = new UserRepository(db);
	}

	async getUsers() {
		this.logger.info('Controller: getUsers', null);
		return await this.repository.getUsers();
	}

	async createUser(user: any) {
		this.logger.info('Controller: getUsers', null);
		return await this.repository.createUser(user);
	}

};
