import { Component, Input } from '@angular/core';
import { Subcategory } from 'src/app/common/model/subcategory.model';
import { Subsubcategory } from 'src/app/common/model/subsubcategory.model';

@Component({
  selector: 'app-subcategory-section-list',
  templateUrl: './subcategory-section-list.component.html',
  styleUrls: ['./subcategory-section-list.component.css']
})
export class SubcategorySectionListComponent {
    
    @Input()
    subsubcategories?: Subsubcategory[];

}