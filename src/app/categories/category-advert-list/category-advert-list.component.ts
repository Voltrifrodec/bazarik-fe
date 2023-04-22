import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faLocationArrow, faExclamationCircle, faCheckCircle, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AdvertResponse } from 'src/app/common/model/advert-response';
import { Advert } from 'src/app/common/model/advert.model';
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

    @Input()
    // adverts?: Advert[];
    adverts?: AdvertResponse;

    @Output()
    pageChange = new EventEmitter<Pagination>();

    private defaultPageNumber = 0;
    private defaultTotalElements = 10;
    private defaultPageSize = 10;
    private defaultFilter = '';

    filterForm = new FormGroup({ lastName: new FormControl() });


    filter(): void {
        this.defaultPageNumber = 0;
        this.pageChange.emit({
            page: this.defaultPageNumber,
            size: this.adverts?.pageable.pageSize ? this.adverts.pageable.pageSize : this.defaultPageSize,
            filter: {
                categoryId: 50506
            }
        });
    }

    changePage(pageNumber: number): void {
        this.defaultPageNumber = pageNumber - 1;
        this.pageChange.emit({
            page: this.defaultPageNumber,
            size: this.adverts?.pageable?.pageSize ? this.adverts?.pageable?.pageSize : this.defaultPageSize,
            filter: {
                categoryId: 50506
            }
        });
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


    advertsAmount?: number;

    ngOnInit() : void {
        // this.advertsAmount = this.adverts?.length;
    }

}
