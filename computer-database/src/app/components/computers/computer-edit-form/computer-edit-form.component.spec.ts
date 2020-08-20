import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerEditFormComponent } from './computer-edit-form.component';

describe('ComputerEditFormComponent', () => {
  let component: ComputerEditFormComponent;
  let fixture: ComponentFixture<ComputerEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputerEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputerEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
