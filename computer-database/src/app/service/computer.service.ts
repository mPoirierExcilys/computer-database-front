import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Page} from '../Models/page.model';
import {Computer} from '../Models/computer.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {

  baseUrl= 'http://10.0.1.108:8080/webapprest/computers';

constructor(private http: HttpClient) { }
  getComputers(page: Page, search?: string): Observable<Computer[]>{
    let parameters = new HttpParams();
    parameters = parameters.append('ascending', page.ascending);
    parameters = parameters.append('currentPage', String(page.currentPage));
    parameters = parameters.append('itemsByPage', String(page.itemsByPage));
    parameters = parameters.append('order', String(page.order));
    parameters = parameters.append('search', search);
    return this.http.get<Computer[]>(this.baseUrl, {params: parameters});
  }
  getComputer(id: number): Observable<Computer>{
    return this.http.get<Computer>(`${this.baseUrl}/${id}`);
  }
  deleteComputer(id: number): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  createComputer(computer: Computer): Observable<string>{
    return this.http.post<string>(this.baseUrl, computer);
  }
  updateComputer(computer: Computer): Observable<string>{
    return this.http.put<string>(`${this.baseUrl}/${computer.idComputer}`, computer);
  }
  getNbPages(page: Page, search?: string): Observable<number>{
    let parameters = new HttpParams();
    parameters = parameters.append('itemsByPage', String(page.itemsByPage));
    parameters = parameters.append('search', search);
    return this.http.get<number>(`${this.baseUrl}/nbPages`, {params: parameters});
  }
  getNbComputer(search?: string): Observable<number>{
    let parameters = new HttpParams();
    parameters = parameters.append('search', search);
    return this.http.get<number>(`${this.baseUrl}/numbers`, {params: parameters});
  }
}
