import { Sequelize } from 'sequelize-typescript';
import * as Models from '../model';

export const connect = () => {

    const hostName = process.env.HOST;
    const userName = process.env.USERNAME;
    const password = process.env.PASSWORD;
    const database = process.env.DB;
    const port = parseInt(process.env.DB_PORT);
    const dialect: any = process.env.DIALECT;

    const sequelize = new Sequelize(database, userName, password, {
        host: hostName,
        port: port,
        dialect,
        repositoryMode: true,
        pool: {
            max: 10,
            min: 0,
            acquire: 20000,
            idle: 5000
        }
    });

    sequelize.addModels([
        // Models.User, 
        Models.Status, 
        Models.Job, 
        Models.JobStatus]);

    const db: any = {};
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;
    db.statusRepository = sequelize.getRepository(Models.Status);
    db.jobRepository = sequelize.getRepository(Models.Job);
    db.jobStatusRepository = sequelize.getRepository(Models.JobStatus);
    
    return db;

}