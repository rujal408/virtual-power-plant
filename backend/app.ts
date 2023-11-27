import express from 'express';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import Routes from './routes';

class App {
  public app:express.Application
  public port:number|string;
  public routes: Routes;

  constructor(){
    dotenv.config();
    this.app=express()
    this.routes = new Routes(this.app); // Initialize the routes propert
    this.port=process.env.PORT||5000
    this.connectDB()
  }

  listen(){
    const port =process.env.PORT;   
    
    this.app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  }

  connectDB(){
    const DB_URL=process.env.DB_NAME
    if(DB_URL){
      mongoose.connect(DB_URL).then(()=>{
        console.log('Connected...')
      }).catch(error=>{
        console.log('Error in Database')
      });
    }
  }
}

const app = new App()
app.listen()