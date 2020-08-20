import { TestBed, getTestBed, inject, async } from '@angular/core/testing';
import { ComputerService } from './computer.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Computer } from '../Models/computer.model';
import { Page } from '../Models/page.model';
import { Company } from '../Models/company.model';
import { UserService } from './user.service';
import { HttpRequest, HttpParams } from '@angular/common/http';
import { User } from '../Models/user.model';

const user : User = new User();

describe('UserService', () => {
  let service: UserService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let dummyUser : User = new User(4, "username", "password", "token", "admin");

  beforeEach(() => {
    user.username = "admin";
    user.password = "password";
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    injector = getTestBed();
    service = injector.get(UserService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));


  it(`should send an expected login request`, async(inject([UserService, HttpTestingController],
    (service: UserService, backend: HttpTestingController) => {
      service.authenticate(user).subscribe(token =>expect(token.token !== ""));

      const req = httpMock.expectOne(`${service.baseUrl}` + "");
      expect(req.request.method).toBe("POST");
      req.flush("");
  })));


  // it(`should send the user`, async(inject([UserService, HttpTestingController],
  //   (service: UserService, backend: HttpTestingController) => {
  //     service.getUser().subscribe(user =>expect(user === dummyUser));

  //     const req = httpMock.expectOne(`${service.baseUrl}` + "/1");
  //     expect(req.request.method).toBe("GET");
  //     req.flush("");
  // })));

  
  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});