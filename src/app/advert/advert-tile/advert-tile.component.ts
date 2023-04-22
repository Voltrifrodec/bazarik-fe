import { Component, Input } from '@angular/core';
import { Advert } from 'src/app/common/model/advert.model';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-advert-tile',
  templateUrl: './advert-tile.component.html',
  styleUrls: ['./advert-tile.component.css']
})
export class AdvertTileComponent {

    faLocationArrow = faLocationArrow;

	@Input()
	advert?: Advert;

	constructor() {}
}
