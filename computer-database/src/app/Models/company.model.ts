export class Company{
  idCompany?: number;
  name: string;

  constructor(
    idCompany?: number,
    name?: string){
      if(idCompany){
        this.idCompany = idCompany;
      }
      if(name){
        this.name = name;
      }
    }

  getIdCompany(): number{
    return this.idCompany;
  }

  getName(): string{
    return this.name;
  }
}
