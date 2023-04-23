import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faLocationArrow, faExclamationCircle, faCheckCircle, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Advert, AdvertResponse } from 'src/app/common/model/advert.model';
import { Pagination } from 'src/app/common/model/pagination';

@Component({
  selector: 'app-category-advert-list',
  templateUrl: './category-advert-list.component.html',
  styleUrls: ['./category-advert-list.component.css']
})
export class CategoryAdvertListComponent implements OnInit {

    faLocationArrow = faLocationArrow;
    faExclamationCircle = faExclamationCircle;
    faCheckCircle = faCheckCircle;
    faPencilAlt = faPencilAlt;
    faTrash = faTrash;
    advertsAmount?: number;

    
    @Input()
    // adverts?: Advert[];
    adverts?: AdvertResponse;
    
    constructor() {
        this.advertsAmount = this.adverts?.content?.length;
        console.log('Amount of received aderts for category:', this.advertsAmount);
    }

    @Output()
    pageChange = new EventEmitter<Pagination>();

    private defaultPageNumber = 0;
    private defaultTotalElements = 10;
    private defaultPageSize = 10;

    filter(): void {
        this.defaultPageNumber = 0;
        this.pageChange.emit({
            page: this.defaultPageNumber,
            size: this.adverts?.pageable?.pageSize ? this.adverts?.pageable?.pageSize : this.defaultPageSize
        })
    }

    changePage(pageNumber: number): void {
        this.defaultPageNumber = pageNumber - 1;
        this.pageChange.emit({
            page: this.defaultPageNumber,
            size: this.adverts?.pageable?.pageSize ? this.adverts?.pageable?.pageSize : this.defaultPageSize
        })
    }
    
    getPageSize(): number {
        return this.adverts?.pageable?.pageSize ? this.adverts?.pageable?.pageSize : this.defaultPageSize
    }
    getPageNumber(): number {
        return this.adverts?.pageable?.pageNumber ? this.adverts?.pageable?.pageNumber + 1 :
            this.defaultPageNumber;
    }
    getTotalElements(): number {
        return this.adverts?.totalElements ? this.adverts?.totalElements : this.defaultTotalElements;
    }



    

    ngOnInit() : void { 
    }

}
