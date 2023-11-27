import express from 'express';
import cors from 'cors';
import BatteryRoutes from './battery';

class Routes {
    public app:express.Application
    public batteryRoutes: BatteryRoutes;

    constructor(app:express.Application){
        this.app = app;
        this.batteryRoutes = new BatteryRoutes();
        this.initializeRoutes();
    }

    private initializeRoutes():void{
        this.app.use(express.json()) // convert the request body into json (parse)
        this.app.use(express.urlencoded())
        this.app.use(cors())
        this.app.use('/api', this.batteryRoutes.router);
    }
}

export default Routes