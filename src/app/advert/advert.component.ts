import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Advert } from '../common/model/advert.model';

@Component({
  selector: 'app-advert',
  templateUrl: './advert.component.html',
  styleUrls: ['./advert.component.css']
})
export class AdvertComponent implements OnChanges {
	@Input()
	advertData?: Advert;

	ngOnChanges(changes: SimpleChanges): void {
		
	}
}
