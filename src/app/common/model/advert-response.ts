import { Advert } from "./advert.model";
import { PaginableResponse } from "./paginable-response";

export interface AdvertResponse extends PaginableResponse {
    content: Advert[];
}
