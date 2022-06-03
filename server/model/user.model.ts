import { Table, Column, Model, HasMany, AllowNull } from 'sequelize-typescript';
import Status from './status.model';
import Job from './job.model';

@Table({ timestamps: true })
export default class User extends Model {

	// id is already created by extending Model

	@Column({ allowNull: false })
	firstName: string;

	@Column({ allowNull: false })
	lastName: string;

	@HasMany(() => Status, 'id')
	statuses: Status[]

	@HasMany(() => Job, 'id')
	jobs: Job[]

}