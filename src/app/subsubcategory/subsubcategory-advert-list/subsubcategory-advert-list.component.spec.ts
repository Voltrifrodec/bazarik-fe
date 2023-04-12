import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsubcategoryAdvertListComponent } from './subsubcategory-advert-list.component';

describe('SubsubcategoryAdvertListComponent', () => {
  let component: SubsubcategoryAdvertListComponent;
  let fixture: ComponentFixture<SubsubcategoryAdvertListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubsubcategoryAdvertListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubsubcategoryAdvertListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
