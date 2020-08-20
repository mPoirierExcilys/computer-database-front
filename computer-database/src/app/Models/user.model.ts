import {Role} from './role.model';

export class User{
  id?: number;
  name: string;
  password: string;
  token?: string;
  roles: Role[];

  constructor(
    id?: number,
    name?: string,
    password?: string,
    token?: string,
    roles?: Role[]) {
      if(id){
        this.id = id;
      }
      if(name){
        this.name = name;
      }
      if(password){
        this.password = password;
      }
      if(token){
        this.token = token;
      }
      if(roles){
        this.roles = roles;
      }
    }
}
