import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSizeFormComponent } from './page-size-form.component';

describe('PageSizeFormComponent', () => {
  let component: PageSizeFormComponent;
  let fixture: ComponentFixture<PageSizeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageSizeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageSizeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
