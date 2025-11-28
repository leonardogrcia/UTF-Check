import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMain } from './card-main';

describe('CardMain', () => {
  let component: CardMain;
  let fixture: ComponentFixture<CardMain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardMain]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardMain);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
