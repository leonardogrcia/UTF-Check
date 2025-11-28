import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHeader } from './modal-header';

describe('ModalHeader', () => {
  let component: ModalHeader;
  let fixture: ComponentFixture<ModalHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
