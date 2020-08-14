import { TestBed } from '@angular/core/testing';
import { instance, mock, when } from "ts-mockito";
import { CompanyService } from './company.service';
import { Company } from '../Models/company.model';
import {HttpClient, HttpHandler} from '@angular/common/http';

describe('CompanyService', () => {
  let service: CompanyService;
  // let companyMocked:Company = mock(Company);

  // {providers: [CompanyService]} 
  beforeEach(() => {
    // TestBed.configureTestingModule();
    // service = new CompanyService(new HttpClient(TestBed.inject(HttpHandler)));
    listCompanies: Company[5] = [{idcompany : 1, name :'Apple Inc.'}, {idcompany : 2, name :'Thinking Machines'},
      {idcompany : 3, name :'RCA'},{idcompany : 4, name :'Netronics'},{idcompany : 5, name :'Tandy Corporation'}];
    // let companyFoo: Company = instance(companyMocked);
  }); 

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
  
  // it('#getObservableValue should return value from observable',
  //   (done: DoneFn) => {
  //   service.getCompanies().subscribe(value => {
  //     console.log(value);
  //     expect(value).toBe(this.listCompanies);
  //     done();
  //   });
  // });
});