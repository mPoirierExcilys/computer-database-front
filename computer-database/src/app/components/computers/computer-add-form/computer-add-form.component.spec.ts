import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerAddFormComponent } from './computer-add-form.component';

describe('ComputerAddFormComponent', () => {
  let component: ComputerAddFormComponent;
  let fixture: ComponentFixture<ComputerAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputerAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputerAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
