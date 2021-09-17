export interface People {
  id: string;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

export interface User {
  email: string;
  password: string;
}

export const emptyPeople = {
  id: '',
  name: '',
  height: '',
  mass: '',
  hair_color: '',
  skin_color: '',
  eye_color: '',
  birth_year: '',
  gender: '',
};

export const emptyUser = {
  email: '',
  password: '',
};
