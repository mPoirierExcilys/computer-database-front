import { TestBed, getTestBed, inject, async } from '@angular/core/testing';
import { ComputerService } from './computer.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Computer } from '../Models/computer.model';
import { Page } from '../Models/page.model';
import { Company } from '../Models/company.model';

describe('ComputerService', () => {
  let service: ComputerService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ComputerService]
    });
    injector = getTestBed();
    service = injector.get(ComputerService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it('should return an Observable<Computers[]>', () => {
    const page : Page = new Page(1, 1, 2, "Computer.name", "ASC");
    const company1: Company = new Company(1, "Apple Inc.");
    const company2: Company = new Company(2, "Thinking Machines");
    const dummyComputers : Computer[] = [new Computer(1,"MacBook Pro 15.4 inch.",null,null,company1),
      new Computer(3,"CM-200",null,null,company2)];
      
    service.getComputers(page, "").subscribe(computers => {
      expect(computers.length).toBe(2);
      expect(computers).toEqual(dummyComputers);
    });
  
    const req = httpMock.expectOne(`${service.baseUrl}` + "?ascending=ASC&currentPage=1&itemsByPage=2&order=Computer.name&search=");
    expect(req.request.method).toBe("GET");
    req.flush(dummyComputers);
  });

  it(`should return a number`, async(inject([ComputerService, HttpTestingController],
    (service: ComputerService, backend: HttpTestingController) => {
      service.getNbComputer().subscribe((next) => {
        expect(next).toBeGreaterThanOrEqual(0);
      });
      backend.expectOne(`${service.baseUrl}/numbers?search=`).flush(null, { status: 200, statusText: 'Ok' });
  })));
});