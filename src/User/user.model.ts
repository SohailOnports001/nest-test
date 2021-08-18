/* eslint-disable prettier/prettier */
export class UserModel {
  constructor(
    public uuid: string,
    public email: string,
    public password: string,
    public access_token:string
  ) {}
}
