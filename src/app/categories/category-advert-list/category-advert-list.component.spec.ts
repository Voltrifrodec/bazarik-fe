import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryAdvertListComponent } from './category-advert-list.component';

describe('CategoryAdvertListComponent', () => {
  let component: CategoryAdvertListComponent;
  let fixture: ComponentFixture<CategoryAdvertListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryAdvertListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryAdvertListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
