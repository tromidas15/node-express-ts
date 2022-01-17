import Joi , {ValidationResult} from "@hapi/joi";
import { isValidObjectId, Types } from "mongoose";
import { ErrorFormat } from "../Controller/Interfaces";
import UserModel from '../models/userModel';
import BaseValidator from "./baseValidator";

interface userRequest {
    name : string,
    email : string,
    password : string
}

export default class ValidateUserRegister extends BaseValidator {
  constructor() {
    super();
  }

  public validateCreate(data: userRequest): null|ErrorFormat[]  {
      const schema = Joi.object({
        name: Joi.string().min(6).required().messages({
            "string.min": "name.length[6]",
            "string.empty": "name.required",
          }),
        email: Joi.string().min(6).email().required()
        .custom(async (value, helper) => {
          let user = await UserModel.findOne({email : value});
          if(user) helper.message({name : "name.exists"});
          return true;
        }
        ).messages({
            "string.min": "Not a valid email address.",
            "string.empty": "Email is required.",
          }),
        password: Joi.string().min(6).required()
      })

      return this.validate(schema , data);
  }

  public validateUpdate(data: userRequest): null|ErrorFormat[]  {
      const schema = Joi.object({
        name: Joi.string().min(6).required().messages({
            "string.min": "name.length[6]",
            "string.empty": "name.required",
          }),
        email: Joi.string().min(6).email().required()
          .messages({
            "string.min": "Not a valid email address.",
            "string.empty": "Email is required.",
          }),
        password: Joi.string().min(6).required()
      });

      return this.validate(schema , data);
  }

  public async checkUserExists(email : string , id: string|null = null) : Promise<null|ErrorFormat[]> {

    let user = await UserModel.findOne({email : email ,  _id: { $ne: new Types.ObjectId(id ?? '') }});
      if (user){
        return  [
            {
              field : "GeneralError",
              value : 'user.exists'
            }
        ]
      }
      return null;
  }
  
}