import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartingPage } from './starting-page';

describe('StartingPage', () => {
  let component: StartingPage;
  let fixture: ComponentFixture<StartingPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartingPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
