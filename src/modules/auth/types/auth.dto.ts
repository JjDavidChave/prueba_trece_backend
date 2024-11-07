import J = require('joi');

const passwordComplexity = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

export const CreateAuthSchema = J.object({
  email: J.string().email().required(),
  password: J.string().pattern(passwordComplexity).required().messages({
    'string.pattern.base': 'La contraseña debe contener al menos 8 caracteres, incluidas mayúsculas, minúsculas, números y caracteres especiales.',
  }),
  fullName: J.string().required(),
  isActive: J.boolean().required(),
  role: J.array().items(J.string()).default(['Auth']),
});

export const UpdateAuthSchema = J.object({
  email: J.string().email().optional(),
  password: J.string().pattern(passwordComplexity).optional().messages({
    'string.pattern.base': 'La contraseña debe contener al menos 8 caracteres, incluidas mayúsculas, minúsculas, números y caracteres especiales.',
  }),
  fullName: J.string().optional(),
  isActive: J.boolean().optional(),
  role: J.array().items(J.string()).optional(),
});

export class CreateAuthDto {
  email: string;
  password: string;
  fullName: string;
  isActive: boolean;
  role: string[];
}

export class UpdateAuthDto {
  email?: string;
  password?: string;
  fullName?: string;
  isActive?: boolean;
  role?: string[];
}

export class AuthResponse {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  role: string[];
  createdAt: Date;
  updatedAt: Date;
}
