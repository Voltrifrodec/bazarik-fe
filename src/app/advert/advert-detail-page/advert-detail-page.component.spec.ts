import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertDetailPageComponent } from './advert-detail-page.component';

describe('AdvertDetailPageComponent', () => {
  let component: AdvertDetailPageComponent;
  let fixture: ComponentFixture<AdvertDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertDetailPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvertDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
