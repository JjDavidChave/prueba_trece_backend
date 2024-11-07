import J = require('joi');

export const LoginAuthSchema = J.object({
  email: J.string().email().required(),
  password: J.string().required(),
});

export class LoginAuthDto {
  email: string;
  password: string;
}

export class LoginAuthResponse {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  role: string[];
  createdAt: Date;
  updatedAt: Date;
}
