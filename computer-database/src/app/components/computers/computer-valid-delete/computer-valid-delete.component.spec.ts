import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerValidDeleteComponent } from './computer-valid-delete.component';

describe('ComputerValidDeleteComponent', () => {
  let component: ComputerValidDeleteComponent;
  let fixture: ComponentFixture<ComputerValidDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputerValidDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputerValidDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
