import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalContent } from './modal-content';

describe('ModalContent', () => {
  let component: ModalContent;
  let fixture: ComponentFixture<ModalContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalContent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
