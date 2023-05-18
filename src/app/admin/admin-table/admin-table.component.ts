import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faTrash, faExpandArrowsAlt, faPen, faSearch } from '@fortawesome/free-solid-svg-icons';
import { AdvertResponse } from 'src/app/common/model/advert.model';
import { Pagination } from 'src/app/common/model/pagination.model';

@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.css']
})
export class AdminTableComponent {

	faBin = faTrash;
	faArrow = faExpandArrowsAlt;
	faPen = faPen;
	faSearch = faSearch;

	@Output()
	advertToDelete = new EventEmitter<string>();

	@Output()
	advertsToDelete = new EventEmitter<string[]>();
	
	@Input()
	adverts?: AdvertResponse;
	
	@Output()
	pageChange = new EventEmitter<Pagination>();
	
	advertTableForm: FormGroup;
	searchForm: FormGroup; 
	paginationForm: FormGroup; 

	private defaultPageNumber = 0;
	private defaultTotalElements = 10;
	private defaultPageSize = 10;
	private defaultFilter = '';

	constructor() {
		this.advertTableForm = new FormGroup({
			checkboxToggle: new FormControl(false, [])
		});

		this.searchForm = new FormGroup({
			query: new FormControl('', [Validators.required]),
		})

		this.paginationForm = new FormGroup({
			pageSize: new FormControl(this.defaultPageSize, [Validators.required])
		})
	}
	
	filter(): void {
		this.defaultPageNumber = 0;
		this.defaultFilter = this.searchForm.controls['query'].value;
		this.pageChange.emit({
			page: this.defaultPageNumber,
			size: this.adverts?.pageable?.pageSize ? this.adverts?.pageable?.pageSize : this.defaultPageSize,
			filter: {
				query: this.defaultFilter
			}
		})
	}

	changePage(pageNumber: number): void {
		this.defaultPageNumber = ((pageNumber <= 1) ? 1 : 0) - 1;
		let page: Pagination = {
			page: this.defaultPageNumber,
			size: this.adverts?.pageable?.pageSize ? this.adverts?.pageable?.pageSize : this.defaultPageSize,
			filter: {
				query: this.defaultFilter
			}
		}
		this.pageChange.emit(page);
	}

	setPageSize(): void {
		this.defaultPageSize = this.paginationForm.controls['pageSize'].value;
		if (this.adverts) {
			this.adverts.pageable.pageSize = this.defaultPageSize;
		}
		this.changePage(this.getPageNumber());
	}

	getPageSize(): number {
		return this.adverts?.pageable?.pageSize ? this.adverts?.pageable?.pageSize : this.defaultPageSize
	}
	
	getPageNumber(): number {
		return this.adverts?.pageable?.pageNumber ? this.adverts?.pageable?.pageNumber + 1 : this.defaultPageNumber;
	}
	
	getTotalElements(): number {
		return this.adverts?.content?.length ? this.adverts?.totalElements : this.defaultTotalElements;
	}

	deleteAdverts(): void {
		let checkboxes = document.getElementsByName('checkbox');
		let advertsIds: string[] = [];

		checkboxes.forEach((checkbox) => {
			let s = checkbox as HTMLInputElement;
			if (s.checked) {
				advertsIds.push(s.value);
			}
		});

		if (advertsIds.length == 0) {
			window.alert('Na vymazanie inzerátov je nutné označiť aspoň jeden inzerát.');
			return;
		}

		if (!window.confirm(`Počet inzerátov na vymazanie: ${advertsIds.length}\nSte si istí?`)) {
			return;
		}

		this.advertsToDelete.emit(advertsIds);
	}

	getDateFromTimestamp(timestamp: any) {
		return new Date(timestamp).toLocaleString();
	}

	deleteAdvert(advertId: string) {
		this.advertToDelete.emit(advertId);
	}
	
	copy(text: any): void {
		navigator.clipboard.writeText(text);
		window.alert(`Text\n${text}\nbol úspešne skopírovaný.`);
	}

	toggleAllCheckboxes(): void {
		let toCheck = this.advertTableForm.controls['checkboxToggle'].value

		let checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]'));

		checkboxes.forEach((checkbox) => {
			let s = checkbox as HTMLInputElement;
			s.checked = toCheck ? false : true;
		});
	}

}
