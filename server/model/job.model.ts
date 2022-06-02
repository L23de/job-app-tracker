import { Table, Column, Model, DataType, ForeignKey, BelongsTo, BelongsToMany } from 'sequelize-typescript';
import User from './user.model';
import Status from './status.model';
import JobStatus from './jobStatus.model';

@Table({ timestamps: true })
export default class Job extends Model {

	// id is already created by extending Model

	@Column({ allowNull: false })
	companyName: string;

	@Column({ allowNull: false })
	position: string;

	@Column({ type: DataType.TEXT, allowNull: false })
	notes: string;

	// @ForeignKey(() => User)
	// @Column
	// userId: number;

	// @BelongsTo(() => User, 'id')
	// user: User

	@BelongsToMany(() => Status, () => JobStatus, 'id', 'statusId')
	statuses: Array<Status & {JobStatus: JobStatus}>;

}