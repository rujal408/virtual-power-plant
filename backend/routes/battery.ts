import { Router} from 'express';
import BatteryController from '../controller/BatteryController';

class BatteryRoutes extends BatteryController {
    public router: Router;
    public path="/batteries"

    constructor() {
        super()
        this.router = Router();
        this.initializeRoutes();
      }

      private initializeRoutes() {
        this.router.get(`${this.path}`, this.getBatteries);
        this.router.post(`${this.path}`, this.createBattery);
      }
}

export default BatteryRoutes