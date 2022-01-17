import { model, Schema } from "mongoose";
import { RoleModule, UserModule } from "../libs/ModulesList";
import { CreatePermission, DeletePermission, UpdatePermission, ViewPermission } from "../libs/PermissionsList";

export type RoleModelType = {
    name : string,
    _id : string
}

const Modules : Schema = new Schema({
    module : {
        type : Number,
        enum : [UserModule , RoleModule],
        required : true
    },
    permissions : {
        type : Array,
        required : true
    }
});

const RoleSchema: Schema = new Schema({
    name : {
        type : String,
        required: true,
        min : 3,
        max : 50
    },
    modules : [Modules],
}, {
    timestamps: true
  });



export default model('RoleModel' , RoleSchema)