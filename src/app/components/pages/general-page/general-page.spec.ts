import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralPage } from './general-page';

describe('GeneralPage', () => {
  let component: GeneralPage;
  let fixture: ComponentFixture<GeneralPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
