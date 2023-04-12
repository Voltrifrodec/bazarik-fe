import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from 'src/app/common/model/category.model';
import * as fa from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent {
    fa = fa;

    @Input()
    categories? : Category[];


}
