import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFooter } from './modal-footer';

describe('ModalFooter', () => {
  let component: ModalFooter;
  let fixture: ComponentFixture<ModalFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalFooter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
