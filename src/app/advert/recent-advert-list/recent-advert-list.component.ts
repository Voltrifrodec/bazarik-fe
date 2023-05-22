import { Component, Input } from '@angular/core';
import { faBox } from '@fortawesome/free-solid-svg-icons';
import { Advert } from 'src/app/common/model/advert.model';

@Component({
  selector: 'app-recent-advert-list',
  templateUrl: './recent-advert-list.component.html',
  styleUrls: ['./recent-advert-list.component.css']
})
export class RecentAdvertListComponent {

	faAdvert = faBox;
    
    @Input()
    adverts?: Advert[];

}
