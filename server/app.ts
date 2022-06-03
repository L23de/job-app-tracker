import * as bodyParser from "body-parser";
import * as express from "express";
import { APILogger } from "./logger/api.logger";
import * as Controllers from './controller';
// import { TaskController } from "./controller/task.controller";
import { connect } from "./config/db.config";
import * as swaggerUi from 'swagger-ui-express';
import * as fs from 'fs';
import 'dotenv/config';


class App {

    public express: express.Application;
    public logger: APILogger;
    // public taskController: TaskController;
    public jobController: Controllers.JobController;
    public statusController: Controllers.StatusController;

    // swagger api doc files
    private swaggerFile: any = (process.cwd()+"/swagger/swagger.json");
    private swaggerData: any = fs.readFileSync(this.swaggerFile, 'utf8');
    private customCss: any = fs.readFileSync((process.cwd()+"/swagger/swagger.css"), 'utf8');
    private swaggerDocument = JSON.parse(this.swaggerData);


    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.logger = new APILogger();

        const db = connect();
        const force = process.env.UPDATE === "true" ? true : false;
		db.sequelize.sync({ force: force }).then(() => {
			console.log("Drop and re-sync db");
		});

        // this.taskController = new TaskController(db);
        this.jobController = new Controllers.JobController(db);
        this.statusController = new Controllers.StatusController(db);
    }

    // configure express middleware
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {

        this.express.get('/', (req, res, next) => {
            res.send("Typescript App works!!");
        });

        // swagger docs
        // this.express.use('/api/docs', swaggerUi.serve,
        //     swaggerUi.setup(this.swaggerDocument, null, null, this.customCss));


        /** 
         * ================
         * GET Requests
         * ================ 
         */

        this.express.get('/api/status', (req, res) => {
            this.statusController.getStatuses()
                .then(data => res.json(data));
        });

        this.express.get('/api/status/:id', (req, res) => {
            this.statusController.getStatus(parseInt(req.params.id))
                .then(data => res.json(data))
                .catch(err => res.send('make sure the id parameter is a numeric'));
        });

        this.express.get('/api/job', (req, res) => {
            this.jobController.getJobs()
                .then(data => res.json(data));
        });

        this.express.get('/api/job/:id', (req, res) => {
            this.jobController.getJob(parseInt(req.params.id))
                .then(data => res.json(data))
                .catch(err => res.send('make sure the id parameter is a numeric'));
        });


        /** 
         * ================
         * POST Requests
         * ================ 
         */

        this.express.post('/api/status', (req, res) => {
            console.log(req.body);
            this.statusController.createStatus(req.body.status)
                .then(data => res.json(data));
        });

        this.express.post('/api/job', (req, res) => {
            console.log(req.body);
            this.jobController.createJob(req.body.job)
                .then(data => res.json(data));
        });


        /** 
         * ================
         * PUT Requests
         * ================ 
         */
        this.express.put('/api/status/:id', (req, res) => {
            console.log(req.body);
            this.statusController.updateStatus(parseInt(req.params.id), req.body.status)
                .then(data => res.json(data))
                .catch(err => res.send('make sure the id parameter is a numeric'));
        });

        this.express.put('/api/job/:id', (req, res) => {
            console.log(req.body);
            this.jobController.updateJob(parseInt(req.params.id), req.body.job)
                .then(data => res.json(data))
                .catch(err => res.send('make sure the id parameter is a numeric'));
        });



        /** 
         * ================
         * DELETE Requests
         * ================ 
         */
        this.express.delete('/api/status/:id', (req, res) => {
            this.statusController.deleteStatus(parseInt(req.params.id))
                .then(data => res.json(data))
                .catch(err => res.send('make sure the id parameter is a numeric'));
        });

        this.express.delete('/api/job/:id', (req, res) => {
            this.jobController.deleteJob(parseInt(req.params.id))
                .then(data => res.json(data))
                .catch(err => res.send('make sure the id parameter is a numeric'));
        });




        // handle undefined routes 
        this.express.use("*", (req, res, next) => {
            res.send("Make sure url is correct!!!");
        });


        // this.express.get('/api/tasks', (req, res) => {
        //     this.taskController.getTasks().then(data => res.json(data));
        // });
        
        // this.express.post('/api/task', (req, res) => {
        //     console.log(req.body);
        //     this.taskController.createTask(req.body.task).then(data => res.json(data));
        // });
        
        // this.express.put('/api/task', (req, res) => {
        //     this.taskController.updateTask(req.body.task).then(data => res.json(data));
        // });
        
        // this.express.delete('/api/task/:id', (req, res) => {
        //     this.taskController.deleteTask(req.params.id).then(data => res.json(data));
        // });

    }

}

export default new App().express;