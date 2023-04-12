import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryAdvertListComponent } from './subcategory-advert-list.component';

describe('SubcategoryAdvertListComponent', () => {
  let component: SubcategoryAdvertListComponent;
  let fixture: ComponentFixture<SubcategoryAdvertListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcategoryAdvertListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubcategoryAdvertListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
