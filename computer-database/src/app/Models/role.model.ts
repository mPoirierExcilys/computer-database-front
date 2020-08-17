export class Role{
  id: number;
  name: string;

  constructor(id?: number, name?: string){
    if (id){
      this.id = id;
    }
    if (name){
      this.name = name;
    }
  }
}
