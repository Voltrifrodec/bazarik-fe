import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-page-size-form',
  templateUrl: './page-size-form.component.html',
  styleUrls: ['./page-size-form.component.css']
})
export class PageSizeFormComponent {
	// TODO: Output emitter
	@Output()
	pageSizeOutput = new EventEmitter<number>();

	// TODO: Pagination form
	@Input()
	pageSize: number = 10;
	
	paginationForm: FormGroup;

	constructor() {
		this.paginationForm = new FormGroup({
			pageSize: new FormControl(this.pageSize, [Validators.required])
		})
	}

	setPageSize(): void {
		let pageSize = this.paginationForm.controls['pageSize'].value;
		console.log(pageSize);
		this.pageSizeOutput.emit(pageSize);
	}

}
