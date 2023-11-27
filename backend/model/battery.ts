import mongoose from "mongoose";
const {Schema, model} = mongoose

// Schema
const batterySchema = new Schema({
    name:{
        type:String,
        required:true
    },
    post_code:{
        type:Number,
        required:true
    },
    watt_capacity:{
        type:Number,
        required:true
    }
},{timestamps:true})

const Battery = model('Battery',batterySchema)

export default Battery