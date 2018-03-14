export class User {
  constructor(
    public id: number,
    public email: string,
    public lastname: string,
    public firstname: string,
    public username: string,
    public password: string,
    public organiser: string,
  ) {}
}
