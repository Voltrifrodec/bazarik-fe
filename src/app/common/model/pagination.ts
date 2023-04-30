export interface Pagination {

    page: number;
    size: number;
    filter: {
        categoryId: number; 
    }
}

export interface PaginableResponse {
    pageable: {
        pageNumber: number;
        pageSize: number;
    }

    totalElements: number;
}
