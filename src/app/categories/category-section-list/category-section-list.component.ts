import { Component, Input, OnInit } from '@angular/core';
import { Subcategory } from 'src/app/common/model/subcategory.model';
@Component({
  selector: 'app-category-section-list',
  templateUrl: './category-section-list.component.html',
  styleUrls: ['./category-section-list.component.css']
})
export class CategorySectionListComponent {

    @Input()
    subcategories?: Subcategory[];
    

}
