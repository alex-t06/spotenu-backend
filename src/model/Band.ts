export class Band {
  constructor(
    private name: string,
    private email: string,
    private nickname: string,
    private approved: boolean
  ) {}

  public getName() {
    return this.name;
  }

  public getEmail() {
    return this.email;
  }

  public getNickname() {
    return this.nickname;
  }

  public getApproved() {
    return this.approved;
  }

  public static toBandModel(band: any): Band {
    return new Band(
      band.name,
      band.email,
      band.nickname,
      band.approved
    );
  }
}

export interface BandInputDTO {
  name: string;
  email: string;
  password: string;
  nickname: string;
  role: string;
  description: string;
}
