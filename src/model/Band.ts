export interface BandInputDTO {
  name: string;
  email: string;
  password: string;
  nickname: string;
  role: string;
  description: string;
}

export interface BandDTO {
  name: string;
  email: string;
  nickname: string;
  approved: boolean;
}
