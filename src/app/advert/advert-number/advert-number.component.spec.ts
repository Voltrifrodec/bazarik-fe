import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertNumberComponent } from './advert-number.component';

describe('AdvertNumberComponent', () => {
  let component: AdvertNumberComponent;
  let fixture: ComponentFixture<AdvertNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertNumberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvertNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
