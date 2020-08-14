export class User{
  id?: number;
  username: string;
  password: string;
  token?: string;
  role: string;

  constructor(
    id?: number,
    username?: string,
    password?: string,
    token?: string,
    role?: string) {
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
      if(role){
        this.role = role;
      }
    }
}
