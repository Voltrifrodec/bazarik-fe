import { Component, Input } from '@angular/core';
import * as fa from '@fortawesome/free-solid-svg-icons';
import { Advert } from 'src/app/common/model/advert.model';

@Component({
  selector: 'app-subcategory-advert-list',
  templateUrl: './subcategory-advert-list.component.html',
  styleUrls: ['./subcategory-advert-list.component.css']
})
export class SubcategoryAdvertListComponent {
    fa = fa;

    @Input()
    adverts?: Advert[];
}
