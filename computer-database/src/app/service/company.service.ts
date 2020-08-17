import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Company} from '../Models/company.model';
import {Page} from '../Models/page.model';
import { URL } from '../../assets/configurations/config';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  baseUrl = URL.baseUrl + '/companies';

  constructor(private http: HttpClient) { }
  getCompanies(): Observable<Company[]>{
    return this.http.get<Company[]>(this.baseUrl);
  }

  getCompany(id: number): Observable<Company>{
    return this.http.get<Company>(`${this.baseUrl}/${id}`);
  }

  deleteCompany(id: number): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getNbPages(page: Page): Observable<number>{
    let parameters = new HttpParams();
    parameters = parameters.append('itemsByPage', String(page.itemsByPage));
    return this.http.get<number>(`${this.baseUrl}/nbPages`, {params: parameters});
  }

  getNbCompanies(): Observable<number>{
    return this.http.get<number>(`${this.baseUrl}/numbers`);
  }

  getCompaniesByPage(page: Page): Observable<Company[]>{
    let parameters = new HttpParams();
    parameters = parameters.append('ascending', page.ascending);
    parameters = parameters.append('currentPage', String(page.currentPage));
    parameters = parameters.append('itemsByPage', String(page.itemsByPage));
    parameters = parameters.append('order', String(page.order));
    return this.http.get<Company[]>(`${this.baseUrl}/page`, {params: parameters});
  }
}
