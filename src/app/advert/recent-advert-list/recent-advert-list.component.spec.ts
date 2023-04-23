import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentAdvertListComponent } from './recent-advert-list.component';

describe('RecentAdvertListComponent', () => {
  let component: RecentAdvertListComponent;
  let fixture: ComponentFixture<RecentAdvertListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentAdvertListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentAdvertListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
