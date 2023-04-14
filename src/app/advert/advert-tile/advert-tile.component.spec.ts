import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertTileComponent } from './advert-tile.component';

describe('AdvertTileComponent', () => {
  let component: AdvertTileComponent;
  let fixture: ComponentFixture<AdvertTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertTileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvertTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
