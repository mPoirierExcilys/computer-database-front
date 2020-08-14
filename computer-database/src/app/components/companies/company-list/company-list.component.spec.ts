import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CompanyListComponent } from './company-list.component';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { Company } from 'src/app/Models/company.model';
import { CompanyService } from 'src/app/service/company.service';
import { Observable, of } from 'rxjs';
import { ObserveOnMessage } from 'rxjs/internal/operators/observeOn';
import { ActivatedRoute } from '@angular/router';

describe('CompanyListComponent', () => {
  let component: CompanyListComponent;
  let fixture: ComponentFixture<CompanyListComponent>;
  let getCompaniesSpy: jasmine.Spy;
  let quoteEl: HTMLElement;
  let company : Company = new Company();
  let companiesList : Company[];



  // Helper function to get the error message element value
  // An *ngIf keeps it out of the DOM until there is an error
  // const errorMessage = () => {
  //   const el = fixture.nativeElement.querySelector('.error');
  //   return el ? el.textContent : null;
  // };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyListComponent ]
    })
    .compileComponents();
    
    company.idCompany = 5;
    company.name = "Plop";
    companiesList = [];
    companiesList.push(company);

    const UserService = jasmine.createSpyObj('UserService', ['getCompanies']);
    getCompaniesSpy = UserService.getCompanies;

    TestBed.configureTestingModule({
      declarations: [ CompanyListComponent ],
      providers:    [ { provide: UserService, useValue: UserService, activatedRoute : ActivatedRoute } ]
    });

    fixture = TestBed.createComponent(CompanyListComponent);
    component = fixture.componentInstance;
    quoteEl = fixture.nativeElement.querySelector('.user');
  }));

  // Still need fakeAsync() because of component's setTimeout()
  // it('should display error when TwainService fails', fakeAsync(() => {
  //   fixture = TestBed.createComponent(CompanyListComponent);

  //   let companyService : CompanyService = fixture.debugElement.injector.get(CompanyService);

  //   // const q$ = cold('---#|', companiesList, new Error('UserService test failure'));
  //   getCompaniesSpy.and.returnValue(() => of(companiesList));

  //   fixture.detectChanges();

  //   // expect(quoteEl.textContent).toBe('...', 'should show placeholder');

  //   // getTestScheduler().flush(); // flush the observables
  //   // tick();                     // component shows error after a setTimeout()
  //   // fixture.detectChanges();    // update error message

    
  //   expect(companyService.getCompanies()).toBe(of(companiesList));
  //   // expect(errorMessage()).toMatch(/test failure/, 'should display error');
  //   // expect(quoteEl.textContent).toBe('...', 'should show placeholder');
  // }));
});



//   // A synchronous test that simulates async behavior
//   it('should show quote after getQuote (marbles)', () => {
//     // observable test quote value and complete(), after delay
//     const q$ = cold('---x|', { x: testQuote });
//     getQuoteSpy.and.returnValue( q$ );

//     fixture.detectChanges(); // ngOnInit()
//     expect(quoteEl.textContent).toBe('...', 'should show placeholder');

//     getTestScheduler().flush(); // flush the observables

//     fixture.detectChanges(); // update view

//     expect(quoteEl.textContent).toBe(testQuote, 'should show quote');
//     expect(errorMessage()).toBeNull('should not show error');
//   });






// });

