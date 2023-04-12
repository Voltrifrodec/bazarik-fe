import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySectionListComponent } from './category-section-list.component';

describe('CategorySectionListComponent', () => {
  let component: CategorySectionListComponent;
  let fixture: ComponentFixture<CategorySectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorySectionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorySectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
