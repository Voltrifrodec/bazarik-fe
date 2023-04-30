import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Advert, AdvertResponse } from '../common/model/advert.model';
import { Category } from '../common/model/category.model';
import { Pagination } from '../common/model/pagination';
import { Subcategory } from '../common/model/subcategory.model';
import { AdvertService } from '../common/service/advert.service';
import { CategoryService } from '../common/service/category.service';

@UntilDestroy()
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
    categoryId: number;
    category?: Category;
    isLoaded: boolean = false;

    subcategories?: Subcategory[];
    adverts?: AdvertResponse;

    // TODO: Prehodiť advert funkcie do category-advert-list
    constructor(private categoryService: CategoryService, private advertService: AdvertService, private route: ActivatedRoute) {
        this.categoryId = this.route.snapshot.params['categoryId'];
        this.categoryService.getCategoryById(this.categoryId).pipe(untilDestroyed(this)).subscribe((category: Category) => {
                this.category = category;
        });
        // console.log('This category has ID:', this.categoryId);
        // this.getSubcategories();
        // this.getAdverts();
    }


    getSubcategories(): void {
        this.categoryService.getSubcategoriesByCategoryId(this.categoryId).pipe(untilDestroyed(this)).subscribe((subcategories: Subcategory[]) => {
            this.subcategories = subcategories;
            // console.log('Received subcategories:', this.subcategories);
        });
    }

    getAdverts(pagination?: Pagination): void {
        this.advertService.getAllAdvertsByCategoryId(this.categoryId).pipe(untilDestroyed(this)).subscribe((adverts: AdvertResponse) => {
            this.adverts = adverts;
            let date = new Date().toUTCString();
            console.log(date, 'Received adverts for the category:', this.adverts);
        })
    }

    ngOnInit(): void {
        this.getSubcategories();
        this.getAdverts();
        this.categoryService.getCategoryById(this.categoryId).pipe(untilDestroyed(this)).subscribe((category: Category) => {
            this.category = category;
        });
        this.isLoaded = true;
    }
}
