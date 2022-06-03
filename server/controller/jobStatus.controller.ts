import defaultController from "./default.controller";

export default class JobStatusController extends defaultController {

	private jobStatus: any;

	constructor(db: any) {
		super();
		this.jobStatus = db.jobStatusRepository;
	}

	async getJobStatuses(jobId: number) {
		this.logger.info(`Controller: getJobStatuses(${jobId})`, null);
		return await this.jobStatus.findAll({
			where: { jid: jobId }
		}).then(data => {
			console.log('jobStatus:::', data);
			return data;
		}).catch(err => {
			console.log(err);
			return { error: err };
		});
	}

	async createJobStatus(newJobStatus) {
		this.logger.info('Controller: createJobStatus', null);
		return await this.jobStatus.create(newJobStatus)
			.then(data => data)
			.catch(err => {
				console.log(err);
				return { error: err };
			});
	}

	// date may have to change API date format
	async updateJobStatus(jobId: number, statusId: number, date: any) {
		this.logger.info('Controller: updateJobStatus', null);
		try {

			const toUpdate = {
				updatedAt: new Date(date).toISOString()
			};

			return await this.jobStatus.update(
				toUpdate,
				{ where: { jid: jobId, sid: statusId }}
			)
				.then(data => data)
				.catch(err => {
					console.log(err);
					return { error: err };
				});
			
		} catch (err) {

			if (err instanceof RangeError) {
				console.log('bad date format received')
			}
			console.log(err);
			return { error: err };

		}
	}

}