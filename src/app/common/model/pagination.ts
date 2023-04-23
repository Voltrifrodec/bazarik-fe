export interface Pagination {

    page: number;
    size: number;

}

export interface PaginableResponse {

    pageable: {
        pageNumber: number;
        pageSize: number;
    }
    totalElements: number;

}