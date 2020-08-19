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

  getNbPages(page: Page, search?: string): Observable<number>{
    let parameters = new HttpParams();
    parameters = parameters.append('itemsByPage', String(page.itemsByPage));
    parameters = parameters.append('search', search);
    return this.http.get<number>(`${this.baseUrl}/nbPages`, {params: parameters});
  }

  getNbCompanies(search?: string): Observable<number>{
    let parameters = new HttpParams();
    if(search){
      parameters = parameters.append('search', search);
    } else {
      parameters = parameters.append('search', '');
    }
    return this.http.get<number>(`${this.baseUrl}/numbers`, {params: parameters});
  }

  getCompaniesByPage(page: Page, search?: string): Observable<Company[]>{
    let parameters = new HttpParams();
    parameters = parameters.append('ascending', page.ascending);
    parameters = parameters.append('currentPage', String(page.currentPage));
    parameters = parameters.append('itemsByPage', String(page.itemsByPage));
    parameters = parameters.append('order', String(page.order));
    parameters = parameters.append('search', search);
    return this.http.get<Company[]>(`${this.baseUrl}/page`, {params: parameters});
  }
}
