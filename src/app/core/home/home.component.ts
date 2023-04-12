import { Component, OnInit } from '@angular/core';
import * as fa from '@fortawesome/free-solid-svg-icons';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Category } from 'src/app/common/model/category.model';
import { CategoryService } from 'src/app/common/service/category.service';

@UntilDestroy()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  fa = fa;

  constructor(private service: CategoryService) {
    this.getCategories();
  }

  categories?: Category[];

  getCategories() : void {
    this.service.getAllCategories().pipe(untilDestroyed(this)).subscribe((categories: Category[]) => {
        this.categories = categories;
        console.log(this.categories);
    });
  }

  ngOnInit(): void {
      this.getCategories();
  }

}
