import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordPage } from './dashbord-page';

describe('DashbordPage', () => {
  let component: DashbordPage;
  let fixture: ComponentFixture<DashbordPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashbordPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
