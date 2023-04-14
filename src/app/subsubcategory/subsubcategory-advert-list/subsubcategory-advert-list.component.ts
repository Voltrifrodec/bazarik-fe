import { Component, Input } from '@angular/core';
import * as fa from '@fortawesome/free-solid-svg-icons';
import { Advert } from 'src/app/common/model/advert.model';

@Component({
  selector: 'app-subsubcategory-advert-list',
  templateUrl: './subsubcategory-advert-list.component.html',
  styleUrls: ['./subsubcategory-advert-list.component.css']
})
export class SubsubcategoryAdvertListComponent {
    fa = fa;

    @Input()
    adverts?: Advert[];
}
