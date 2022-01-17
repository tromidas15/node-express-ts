import { ObjectSchema } from "@hapi/joi";
import { ErrorFormat } from "../Controller/Interfaces";

export default abstract class BaseValidator {
        protected buildApiErrorResponse(data: any) : ErrorFormat[] {
                let format : ErrorFormat[] = data.details?.map((value: any, key : any) => {
                        return {
                                field: value.path[0],
                                value : value.message
                        }
                })
        
                return format
        }

        protected validate(schema : ObjectSchema , data : any) {
                let {error} = schema.validate(data , {abortEarly: false});
                
                if(error)  {
                  return this.buildApiErrorResponse(error);
                }

                return null;
        }

        abstract validateCreate(data: any) : null|ErrorFormat[];
        abstract validateUpdate(data: any) : null|ErrorFormat[]
}