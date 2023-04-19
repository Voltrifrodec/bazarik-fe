import { Component, Input } from '@angular/core';
import { Advert } from 'src/app/common/model/advert.model';

@Component({
  selector: 'app-recent-advert-list',
  templateUrl: './recent-advert-list.component.html',
  styleUrls: ['./recent-advert-list.component.css']
})
export class RecentAdvertListComponent {
    MilisToDate(arg0: number | undefined | Date) {
        if(arg0 !== undefined) {
            return new Date(arg0);
        }
        throw new Error('Neplatný vstupný parameter!');
    }
    
    @Input()
    adverts?: Advert[];

}
