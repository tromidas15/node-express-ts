export interface ErrorFormat {
    field : string,
    value : string
}

export interface PaginationInterface {
    page: number,
    currentPage: number,
    totalItems: number,
    itemsPerPage: number
}

export interface ResponseFormat {
    data: any,
    isError : boolean,
    errorMessages : null|ErrorFormat[],
    pagination : null|PaginationInterface
}
