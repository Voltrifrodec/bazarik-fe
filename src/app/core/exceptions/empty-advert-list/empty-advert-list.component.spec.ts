import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyAdvertListComponent } from './empty-advert-list.component';

describe('EmptyAdvertListComponent', () => {
  let component: EmptyAdvertListComponent;
  let fixture: ComponentFixture<EmptyAdvertListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyAdvertListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyAdvertListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
