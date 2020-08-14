let httpClientSpy: { get: jasmine.Spy };
import { TestBed, async, inject } from '@angular/core/testing';
import { instance, mock, when } from "ts-mockito";
import { CompanyService } from './company.service';
import { Company } from '../Models/company.model';
import {HttpClient, HttpHandler} from '@angular/common/http';
import { Observable, of } from 'rxjs';

let companyService : CompanyService;
let listCompanies : Company[];

describe('CompanyService', () => {
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    companyService = new CompanyService(<any> httpClientSpy);

    let company1 : Company = new Company(); company1.idCompany = 1; company1.name = "Company number one.";
    let company2 : Company = new Company(); company2.idCompany = 2; company2.name = "Company number not one.";
    listCompanies = [company1, company2];
  }); 
  

  // it('should be called', () => {
  //   httpClientSpy.get.and.returnValue(of(listCompanies));
  //   expect(httpClientSpy['get']);
  // });
  // expect(httpClientSpy('post']).toHaveBeenCalled()

  it('should returns list of companies', () => {
    httpClientSpy.get.and.returnValue(of(listCompanies));
    companyService.getCompanies().subscribe(result => expect(result).toEqual(listCompanies));
  });
});
