export class Company{
  idCompany?: number;
  name: string;

  getId(): number{
    return this.idCompany;
  }

  getName(): string{
    return this.name;
  }
}
