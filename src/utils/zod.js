import z from 'zod';

export const nameValidator = z
  .string()
  .min(1, 'Name is required')
  .regex(
    /^[a-zA-ZÀ-ÿ\s'-]+$/,
    'Name can only contain letters, spaces, hyphens, and apostrophes'
  )
  .trim();

export const emailValidator = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address')
  .trim();

export const passwordValidator = z
  .string()
  .min(6, 'Password must be at least 6 characters')
  .trim();

export const colorValidator = z.string().min(1, 'Color is required').trim();

export const termsValidator = z
  .boolean()
  .refine(val => val === true, 'You must agree to the terms');
