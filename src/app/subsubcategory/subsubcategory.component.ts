import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as fa from '@fortawesome/free-solid-svg-icons';
import { untilDestroyed } from '@ngneat/until-destroy';
import { Advert } from '../common/model/advert.model';
import { Subsubcategory } from '../common/model/subsubcategory.model';
import { AdvertService } from '../common/service/advert.service';
import { SubcategoryService } from '../common/service/subcategory.service';
import { SubsubcategoryService } from '../common/service/subsubcategory.service';

@Component({
  selector: 'app-subsubcategory',
  templateUrl: './subsubcategory.component.html',
  styleUrls: ['./subsubcategory.component.css']
})
export class SubsubcategoryComponent implements OnInit {
    fa = fa;

    subsubcategoryId: number;
    subsubcategory?: Subsubcategory;

    adverts?: Advert[];

    constructor(private subsubcategoryService: SubsubcategoryService, private advertService: AdvertService, private route: ActivatedRoute) {
        this.subsubcategoryId = this.route.snapshot.params['subcategoryId'];
        this.subsubcategoryService.getSubsubcategoryById(this.subsubcategoryId).pipe(untilDestroyed(this)).subscribe((subsubcategory: Subsubcategory) => {
            this.subsubcategory = subsubcategory;
        });
        console.log('This subsubcategory has ID:', this.subsubcategoryId);
    }


    getAdverts(): void {
        this.advertService.getAllAdvertsBySubsubcategoryId(this.subsubcategoryId).pipe(untilDestroyed(this)).subscribe((adverts: Advert[]) => {
            this.adverts = adverts;
            console.log('Received adverts for the subsubcategory:', this.adverts);
        });
    }

    ngOnInit(): void {
        this.getAdverts();
        this.subsubcategoryService.getSubsubcategoryById(this.subsubcategoryId).pipe(untilDestroyed(this)).subscribe((subsubcategory: Subsubcategory) => {
            this.subsubcategory = subsubcategory;
        });
    }

}
