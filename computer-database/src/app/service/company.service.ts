import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Company} from '../Models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  baseUrl= 'http://10.0.1.106:8080/webapprest/companies';
  constructor(private http: HttpClient) { }
  getCompanies(): Observable<Company[]>{
    return this.http.get<Company[]>(this.baseUrl);
  }
}
