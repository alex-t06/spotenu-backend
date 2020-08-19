import { User, UserRole } from './User';

export class UserListener {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private password: string,
    private nickname: string,
    private role: UserRole
  ) {}

  public getId() {
    return this.id;
  }

  public getName() {
    return this.name;
  }

  public getEmail() {
    return this.email;
  }

  public getPassword() {
    return this.password;
  }

  public getNickname() {
    return this.nickname;
  }

  public getRole() {
    return this.role;
  }

  public setName(name: string) {
    this.name = name;
  }

  public setEmail(email: string) {
    this.email = email;
  }

  public setPassword(password: string) {
    this.password = password;
  }

  public setNickname(nickname: string) {
    this.nickname = nickname;
  }

  public setRole(role: UserRole) {
    this.role = role;
  }

  public static toUserListenerModel(userListener: any): UserListener {
    const { id, name, email, password, nickname, role } = userListener;

    return new UserListener(
      id,
      name,
      email,
      password,
      nickname,
      User.stringToUserRole(role)
    );
  }
}

export interface UserInputDTO {
  name: string;
  email: string;
  password: string;
  nickname: string;
  role: string;
}
