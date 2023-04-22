export interface PaginableResponse {

    pageable: {
        pageNumber: number,
        pageSize: number
    };
    totalElements: number;

}
