import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-advert-number',
  templateUrl: './advert-number.component.html',
  styleUrls: ['./advert-number.component.css']
})
export class AdvertNumberComponent implements OnChanges {

	@Input()
	advertNumber?: number;

	numberOfAdvertsWordDeclension = '';

	ngOnChanges(changes: SimpleChanges): void {
		this.getRightWordDeclension();
	}
	
	getRightWordDeclension(): void {
		if (! this.advertNumber) {
			this.numberOfAdvertsWordDeclension = 'inzerátov';
			return;
		};

		if (this.advertNumber == 1) {
			this.numberOfAdvertsWordDeclension = 'inzerát';
		}

		if (this.advertNumber >= 2 && this.advertNumber <= 4) {
			this.numberOfAdvertsWordDeclension = 'inzeráty';
		}

		if (this.advertNumber >= 5 || this.advertNumber <= 0) {
			this.numberOfAdvertsWordDeclension = 'inzerátov';
		}
	}

}
