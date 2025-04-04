export type SignUpParams = {
  uid: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export type SignInParams = {
  email: string;
  idToken: string;
};

export interface User {
  name: string;
  email: string;
  id: string;
}
