import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Advert } from '../common/model/advert.model';
import { Subsubcategory } from '../common/model/subsubcategory.model';
import { AdvertService } from '../common/service/advert.service';
import { SubsubcategoryService } from '../common/service/subsubcategory.service';

@UntilDestroy()
@Component({
  selector: 'app-subsubcategory',
  templateUrl: './subsubcategory.component.html',
  styleUrls: ['./subsubcategory.component.css']
})
export class SubsubcategoryComponent implements OnInit {

    subsubcategoryId: number;
    subsubcategory?: Subsubcategory;

    adverts?: Advert[];

    constructor(private subsubcategoryService: SubsubcategoryService, private advertService: AdvertService, private route: ActivatedRoute) {
        this.subsubcategoryId = this.route.snapshot.params['subsubcategoryId'];
        this.subsubcategoryService.getSubsubcategoryById(this.subsubcategoryId).pipe(untilDestroyed(this)).subscribe((subsubcategory: Subsubcategory) => {
            this.subsubcategory = subsubcategory;
            // console.log('Received subsubcategory:', this.subsubcategory);
        });
        this.getAdverts();
    }


    getAdverts(): void {
        this.advertService.getAllAdvertsBySubsubcategoryId(this.subsubcategoryId).pipe(untilDestroyed(this)).subscribe((adverts: Advert[]) => {
            this.adverts = adverts;
            // console.log('Received adverts for the subsubcategory:', this.adverts);
        });
    }

    ngOnInit(): void {
        this.subsubcategoryId = this.route.snapshot.params['subsubcategoryId'];
        this.subsubcategoryService.getSubsubcategoryById(this.subsubcategoryId).pipe(untilDestroyed(this)).subscribe((subsubcategory: Subsubcategory) => {
            this.subsubcategory = subsubcategory;
            // console.log('Received subsubcategory:', this.subsubcategory);
        });
        this.getAdverts();
    }

}
