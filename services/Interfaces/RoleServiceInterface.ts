export interface RoleRequestInterface {
    name : string,
    modules : ModulesType[]
}

type ModulesType = {
    module : number,
    permissions : [] 
}