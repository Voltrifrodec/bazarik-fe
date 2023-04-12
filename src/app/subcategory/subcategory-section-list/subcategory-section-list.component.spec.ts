import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategorySectionListComponent } from './subcategory-section-list.component';

describe('SubcategorySectionListComponent', () => {
  let component: SubcategorySectionListComponent;
  let fixture: ComponentFixture<SubcategorySectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcategorySectionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubcategorySectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
