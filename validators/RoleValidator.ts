import Joi from "@hapi/joi";
import { ErrorFormat } from "../Controller/Interfaces";
import { AvailableModules } from "../libs/ModulesList";
import { AvailablePermissions } from "../libs/PermissionsList";
import BaseValidator from "./baseValidator";

export default class RolenValidator  extends BaseValidator {
    constructor() {
      super();
    }

    public validateCreate(data: any): ErrorFormat[] | null {
      const schema = Joi.object({
        name: Joi.string().min(3).required().messages({
            "string.min": "name.length[3]",
            "string.empty": "name.required",
          }),
          modules: Joi.array().required().items(Joi.object({
            module : Joi.number().required().valid(...AvailableModules),
            permissions: Joi.array().required().items(Joi.number().valid(...AvailablePermissions))
          }))
      })

      return this.validate(schema , data);
    }

    public validateUpdate(data: any): ErrorFormat[] | null {
      const schema = Joi.object({
        name: Joi.string().min(3).required().messages({
            "string.min": "name.length[3]",
            "string.empty": "name.required",
          }),
          modules: Joi.array().items(Joi.object({
            module : Joi.array().items(Joi.number().valid(AvailablePermissions)),
            permissions: Joi.array().items(Joi.number().valid(AvailableModules))
          }))
      })
      return this.validate(schema , data);
    }
}