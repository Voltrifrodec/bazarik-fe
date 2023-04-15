import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as fa from '@fortawesome/free-solid-svg-icons';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Advert } from '../common/model/advert.model';
import { Category } from '../common/model/category.model';
import { Subcategory } from '../common/model/subcategory.model';
import { Subsubcategory } from '../common/model/subsubcategory.model';
import { AdvertService } from '../common/service/advert.service';
import { CategoryService } from '../common/service/category.service';
import { SubcategoryService } from '../common/service/subcategory.service';
import { SubsubcategoryService } from '../common/service/subsubcategory.service';

@UntilDestroy()
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
        this.subsubcategoryId = this.route.snapshot.params['subsubcategoryId'];
        this.subsubcategoryService.getSubsubcategoryById(this.subsubcategoryId).pipe(untilDestroyed(this)).subscribe((subsubcategory: Subsubcategory) => {
            this.subsubcategory = subsubcategory;
            console.log('Received subsubcategory:', this.subsubcategory);
        });
    }


    getAdverts(): void {
        this.advertService.getAllAdvertsBySubsubcategoryId(this.subsubcategoryId).pipe(untilDestroyed(this)).subscribe((adverts: Advert[]) => {
            this.adverts = adverts;
            console.log('Received adverts for the subsubcategory:', this.adverts);
        });
    }

    ngOnInit(): void {
        // this.getAdverts();
        // this.subsubcategoryService.getSubsubcategoryById(this.subsubcategoryId).pipe(untilDestroyed(this)).subscribe((subsubcategory: Subsubcategory) => {
        //     this.subsubcategory = subsubcategory;
        //     console.log('Received subsubcategory:', this.subsubcategory);
        // });
        // console.log(this.subsubcategory?.id);
        // console.log(`Category ID: ${this.subsubcategory?.subcategory?.category?.id}\nSubcategory ID: ${this.subsubcategory?.subcategory?.id}\nSubsubcategory ID: ${this.subsubcategory?.id}`);
        // // this.subsubcategoryService.getSubsubcategoryById(this.subsubcategoryId).pipe(untilDestroyed(this)).subscribe((subsubcategory: Subsubcategory) => {
        // //     this.subsubcategory = subsubcategory;
        // // });
        // // this.subcategory = this.subsubcategory?.subcategory;
        // // this.categoryService?.getCategoryById(this.subcategory?.category?.id == undefined ? 0 : this.subcategory?.category?.id).pipe(untilDestroyed(this)).subscribe((category: Category) => {
        // //     this.category = category;
        // // });

    }

}
