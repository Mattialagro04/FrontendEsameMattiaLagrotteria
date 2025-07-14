export interface IUser {
  id: number;
  nome: string;
  cognome: string;
  email: string;
  ruolo: 'user' | 'admin';
}

export interface IRegisterUser {
  nome: string;
  cognome: string;
  email: string;
  password: string;
  ruolo: 'user' | 'admin';
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IUpdateUser {
    nome: string;
    cognome: string;
    email: string;
}