import { Component, Input } from '@angular/core';
import { Advert } from 'src/app/common/model/advert.model';

@Component({
  selector: 'app-advert-tile',
  templateUrl: './advert-tile.component.html',
  styleUrls: ['./advert-tile.component.css']
})
export class AdvertTileComponent {

	@Input()
	advert?: Advert;

	
}
