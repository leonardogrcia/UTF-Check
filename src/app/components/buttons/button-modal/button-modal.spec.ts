import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonModal } from './button-modal';

describe('ButtonModal', () => {
  let component: ButtonModal;
  let fixture: ComponentFixture<ButtonModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
