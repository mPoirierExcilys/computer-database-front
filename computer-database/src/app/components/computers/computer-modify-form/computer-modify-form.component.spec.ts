import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerModifyFormComponent } from './computer-modify-form.component';

describe('ComputerModifyFormComponent', () => {
  let component: ComputerModifyFormComponent;
  let fixture: ComponentFixture<ComputerModifyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputerModifyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputerModifyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
