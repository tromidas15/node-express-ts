import {Schema , model} from "mongoose";

export type UserModelType = {
    name : string,
    email : string,
    _id : string
}

const UserSchema: Schema = new Schema({
    name : {
        type : String,
        required: true,
        min : 6,
        max : 50
    },
    email : {
        type : String,
        required: true,
        min : 6,
        max : 50
    },
    password: {
        type : String,
        required: true,
        max : 1024
    },
    created_at: {
        type : Date,
        default : Date.now
    }
});

export default model('User' , UserSchema)