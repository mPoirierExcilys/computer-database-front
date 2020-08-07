import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerRemoveComponent } from './computer-remove.component';

describe('ComputerRemoveComponent', () => {
  let component: ComputerRemoveComponent;
  let fixture: ComponentFixture<ComputerRemoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputerRemoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputerRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
