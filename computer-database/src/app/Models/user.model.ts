import {Role} from './role.model';

export class User{
  id?: number;
  username: string;
  password: string;
  token?: string;
  roles: Role[];

  constructor(
    id?: number,
    username?: string,
    password?: string,
    token?: string,
    roles?: Role[]) {
      if(id){
        this.id = id;
      }
      if(username){
        this.username = username;
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
