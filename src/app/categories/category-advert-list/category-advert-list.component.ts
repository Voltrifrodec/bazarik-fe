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

  @Input() adverts?: AdvertResponse;
    @Output() pageChange = new EventEmitter<Pagination>();

    private defaultPageNumber = 0;
    private defaultTotalElements = 10;
    private defaultPageSize = 10;


    advertsAmount?: number = 0;
    // changePage(pageNumber: number) : void {
    //   this.defaultPageNumber = pageNumber - 1;
    //   this.pageChange.emit({
    //     page: this.defaultPageNumber,
    //     size: this.adverts.
    //   })
    // }


    
    ngOnInit(): void {
      let date = new Date().toUTCString();
      console.log(date, 'Amount of received adverts at advert-list:', this.adverts);
    }

}
