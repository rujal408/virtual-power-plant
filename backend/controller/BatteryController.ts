import { Request,Response } from 'express';
import Battery from '../model/battery';

class BatteryController{
    protected getBatteries=async(req:Request,res:Response):Promise<void>=>{
        try {
            let query:any = {};
    
            if (req.query.name && typeof req.query.name === 'string') {
                const nameRegex = new RegExp(req.query.name, 'i');
                query.name = { $regex: nameRegex };
            }

            console.log({req})
    
            if (req.query.min_post_code && req.query.max_post_code && typeof req.query.min_post_code === 'string' && typeof req.query.max_post_code === 'string') {
                query.post_code = {
                    $gte: parseInt(req.query.min_post_code),
                    $lte: parseInt(req.query.max_post_code)
                };
            }
    
            const batteries = await Battery.find(query)
            const total = await Battery.countDocuments(query);
            res.status(200).json({batteries,total});
        } catch (e) {
            res.status(400).json({ message: "Error" });
        }
    }

    protected createBattery=async(req:Request,res:Response)=>{
        const {name,post_code,watt_capacity} = req.body
        try{
            const battery = await Battery.create({name,post_code,watt_capacity})
            res.status(200).json({success:true,data:battery})
        }catch(e){
            res.status(400).json({ message: "Error" });
        }
    }
}

export default BatteryController