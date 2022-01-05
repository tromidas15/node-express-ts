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

        abstract validateCreate(data: any) : null|ErrorFormat[];
        abstract validateUpdate(data: any) : null|ErrorFormat[]
}