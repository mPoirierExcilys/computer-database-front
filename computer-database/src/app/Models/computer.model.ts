import {Company} from './company.model';

export class Computer{
  idComputer?: number;
  name: string;
  introduced: string;
  discontinued: string;
  companyDto: Company;

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

  getCompany(): Company{
    return this.companyDto;
  }
}
