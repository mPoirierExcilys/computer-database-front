import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerDetailsComponent } from './computer-details.component';

describe('ComputerDetailsComponent', () => {
  let component: ComputerDetailsComponent;
  let fixture: ComponentFixture<ComputerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
