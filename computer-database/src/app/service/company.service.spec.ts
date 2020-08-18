let httpClientSpy: { get: jasmine.Spy };
import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { instance, mock, when } from "ts-mockito";
import { CompanyService } from './company.service';
import { Company } from '../Models/company.model';
import {HttpClient, HttpHandler} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Page } from '../Models/page.model';

let companyService : CompanyService;
let listCompanies : Company[];
const page : Page = new Page(1, 1, 2, "Computer.name", "ASC");

describe('CompanyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CompanyService]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    companyService = new CompanyService(<any> httpClientSpy);
    let injector: TestBed;
    let httpMock: HttpTestingController;

    let company1 : Company = new Company(); company1.idCompany = 1; company1.name = "Company number one.";
    let company2 : Company = new Company(); company2.idCompany = 2; company2.name = "Company number not one.";
    listCompanies = [company1, company2];

    injector = getTestBed();
    companyService = injector.get(CompanyService);
    httpMock = injector.get(HttpTestingController);
  }); 
  
  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  // it('should be called', () => {
  //   httpClientSpy.get.and.returnValue(of(listCompanies));
  //   expect(httpClientSpy['get']);
  // });
  // expect(httpClientSpy('post']).toHaveBeenCalled()

  // it('should returns list of companies', () => {
  //   httpClientSpy.get.and.returnValue(of(listCompanies));
  //   companyService.getCompanies().subscribe(result => expect(result).toEqual(listCompanies));
  // });

  it(`should return a list of companies`, async(inject([CompanyService, HttpTestingController],
    (service: CompanyService, backend: HttpTestingController) => {
      service.getCompanies().subscribe((next) => {
        expect(next).toBeGreaterThanOrEqual(0);
      });
      backend.expectOne(`${service.baseUrl}`).flush(null, { status: 200, statusText: 'Ok' });
  })));

  it(`should return a number 1`, async(inject([CompanyService, HttpTestingController],
    (service: CompanyService, backend: HttpTestingController) => {
      service.getNbCompanies().subscribe((next) => {
        expect(next).toBeGreaterThanOrEqual(0);
      });
      backend.expectOne(`${service.baseUrl}/numbers`).flush(null, { status: 200, statusText: 'Ok' });
  })));

  it(`should return a number 2`, async(inject([CompanyService, HttpTestingController],
    (service: CompanyService, backend: HttpTestingController) => {
      service.getNbPages(page).subscribe((next) => {
        expect(next).toBeGreaterThanOrEqual(0);
      });
      backend.expectOne(`${service.baseUrl}/nbPages?itemsByPage=2`).flush(null, { status: 200, statusText: 'Ok' });
  })));

  it(`should return 1`, async(inject([CompanyService, HttpTestingController],
    (service: CompanyService, backend: HttpTestingController) => {
      service.deleteCompany(1).subscribe((next) => {
        expect(next).toBeGreaterThanOrEqual(0);
      });
      backend.expectOne(`${service.baseUrl}/1`).flush(null, { status: 200, statusText: 'Ok' });
  })));

  it(`should return 2`, async(inject([CompanyService, HttpTestingController],
    (service: CompanyService, backend: HttpTestingController) => {
      service.getCompany(1).subscribe((next) => {
        expect(next).toBeGreaterThanOrEqual(0);
      });
      backend.expectOne(`${service.baseUrl}/1`).flush(null, { status: 200, statusText: 'Ok' });
  })));

  it(`should return 3`, async(inject([CompanyService, HttpTestingController],
    (service: CompanyService, backend: HttpTestingController) => {
      service.getCompaniesByPage(page).subscribe((next) => {
        expect(next).toBeGreaterThanOrEqual(0);
      });
      backend.expectOne(`${service.baseUrl}/page?ascending=ASC&currentPage=1&itemsByPage=2&order=Computer.name`).flush(null, { status: 200, statusText: 'Ok' });
  })));
});
