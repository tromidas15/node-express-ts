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
        email: Joi.string().min(6).email().required().messages({
            "string.min": "Not a valid email address.",
            "string.empty": "Email is required.",
          }),
        password: Joi.string().min(6).required()
      })
      let {error} = schema.validate(data , {abortEarly: false});
      if(error)  {
        return this.buildApiErrorResponse(error);
      }
      return null;
  }

  public validateUpdate(data: userRequest): null|ErrorFormat[]  {
          return null;
  }

  public async checkUserExists(email : string , id: string|null = null) : Promise<null|ErrorFormat[]> {

    let user = await UserModel.findOne({email : email ,  _id: { $ne: new Types.ObjectId(id ?? '') }});
    console.log(user, new Types.ObjectId(id ?? ''))
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