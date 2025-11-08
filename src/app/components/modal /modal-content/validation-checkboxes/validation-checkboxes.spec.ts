import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationCheckboxes } from './validation-checkboxes';

describe('ValidationCheckboxes', () => {
  let component: ValidationCheckboxes;
  let fixture: ComponentFixture<ValidationCheckboxes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidationCheckboxes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationCheckboxes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
