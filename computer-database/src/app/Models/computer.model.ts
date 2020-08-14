import {Company} from './company.model';

export class Computer{
  idComputer?: number;
  name: string;
  introduced: string;
  discontinued: string;
  companyDto: Company;
 
  constructor(
    idComputer?: number,
    name?: string,
    introduced?: string,
    discontinued?: string,
    company?: Company) {
      if(idComputer){
        this.idComputer = idComputer;
      }
      if(name){
        this.name = name;
      }
      if(introduced){
        this.introduced = introduced;
      }
      if(discontinued){
        this.discontinued = discontinued;
      }
      if(company){
        this.companyDto = company;
      }
    }

  getName(): string{
    return this.name;
  }

  getIdComputer(): number{
    return this.idComputer;
  }

  getIntroduced(): string{
    return this.introduced;
  }

  getDiscontinued(): string{
    return this.discontinued;
  }

  getCompanyDto(): Company{
    return this.companyDto;
  }
}
