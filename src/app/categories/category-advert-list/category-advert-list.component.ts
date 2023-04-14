import { Component, Input, OnInit } from '@angular/core';
import * as fa from '@fortawesome/free-solid-svg-icons';
import { Advert } from 'src/app/common/model/advert.model';

@Component({
  selector: 'app-category-advert-list',
  templateUrl: './category-advert-list.component.html',
  styleUrls: ['./category-advert-list.component.css']
})
export class CategoryAdvertListComponent implements OnInit {
    fa = fa;

    @Input()
    adverts?: Advert[];
    advertsAmount?: number;

    ngOnInit() : void {
        this.advertsAmount = this.adverts?.length;
    }

}
